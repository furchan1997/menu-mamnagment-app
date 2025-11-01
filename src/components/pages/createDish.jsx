import { useAppNavigation } from "../../hooks/useAppNavigation";
import Btn from "../btn";
import { useFormik } from "formik";
import Input from "../input";
import { useEffect, useState } from "react";
import { useDish } from "../../contexts/dish.context";
import { dishSchemaValidate } from "../../validation/dish.schema";
// רכיב של יצירת מנה חדשה
function CreateDish() {
  const { goHome } = useAppNavigation(); // שימוש בפונקציית ניווט שחוזרת לעמוד הבית מההוק המותאם אישית
  const { createNewDish, dishList } = useDish(); // קבלת פונקציה של יצירת מנה ורשימת מנות מהקונטקסט

  // הגדרת הטופס עם פורמיק למען ערכים התחלתיים, ולידציה ושליחת הטופס
  const form = useFormik({
    initialValues: {
      // ערכי ברירת מחדל לשדות הטופס
      name: "",
      price: 0,
    },
    // המרה של אובייקט השגיאות לפורמט של שפורמיק מכיר
    validate(values) {
      const dishSchema = dishSchemaValidate(values); // קבלת פונקציית הולידצייה של ג'וי
      const { error } = dishSchema; // קבלת אובייקט השגיאות

      const errors = {};
      if (!error) return {};

      // יצירת אובייקט שגיאות ישיכיל כמפתח את סוג השדה כמפתח וכערך את הודעת השגיאה עצמה
      for (const detali of error.details) {
        const path = detali.path[0];
        const msg = detali.message;
        errors[path] = msg;
      }
      return errors; // החזרת השגיאות ושימוש בו כערך בפרופס של רכיב שדה קלט
    },
    onSubmit(values) {
      // הוספת מנה חדשה לקונטקסט
      createNewDish(values);
      goHome(); // ניווט חזרה לעמוד הראשי אחרי ההוספה
    },
  });

  return (
    <div>
      <h2>צרו מנה חדשה</h2>
      <form onSubmit={form.handleSubmit}>
        <Input
          description={"שם המנה"}
          name={"name"}
          typeOfInput={"text"}
          {...form.getFieldProps("name")}
          error={form?.touched?.name && form?.errors?.["name"]}
          required
        />
        <Input
          description={"מחיר מנה"}
          name={"price"}
          typeOfInput={"number"}
          {...form.getFieldProps("price")}
          error={form?.touched?.price && form?.errors?.["price"]}
          required
        />

        <Btn description={"הוסף"} />
      </form>
      <Btn description={"חזרה למסך הבית"} fn={goHome} />
    </div>
  );
}

export default CreateDish;
