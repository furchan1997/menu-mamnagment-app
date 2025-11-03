import { createContext, useContext, useState, useEffect } from "react";
import Warning from "../messages/warning.msg";

// יצירת הקונטקסט
export const DishContext = createContext();
DishContext.displayName = "Dish";

// יצירת פרובידר אשר יכיל פונקציות וסטייטים הקשורים למנות, נוכל להשתמש בכל רכיב באפליקצייה
export function DishProvider({ children }) {
  //  ניהול מצב רשימת המנות: בעת טעינה ראשונית נבדק האם קיימים נתונים ב-לוקאל סטורג
  // אם כן — נטען אותם, אחרת נתחיל ממערך ריק
  const [dishList, setDishList] = useState(() => {
    const saved = localStorage.getItem("dishList");
    return saved ? JSON.parse(saved) : [];
  });

  // פונקציה ליצירת מנה חדשה והוספתה לרשימה
  const createNewDish = (value) => {
    setDishList((prev) => [...prev, value]);
  };

  // פונקציה שמקבלת שם של מנה ומחזירה מערך של כל המנות ששמן כולל את הטקסט שנשלח
  const getDish = (name) => {
    // מסננת את כל המנות שהשם שלהן תואם (לא תלוי באותיות גדולות/קטנות, מנקה רווחים)
    const getDishByName = dishList.filter((dish) =>
      // מחזירה כל מנה שהשם שלה כולל אפילו חלק מהמחרוזת שהוזנה
      dish.name.toLowerCase().includes(name.toLowerCase().trim())
    );
    // מחזירה מערך של כל ההתאמות שנמצאו (יכול להיות גם ריק אם אין התאמות)
    return getDishByName;
  };

  // פונקציה אשר מוחקת את המנה לפי השם שלה
  const deleteDish = (name) => {
    // נבדק האם יש התאמה בין השם שהתקבל במידה וכן נעשה שינוי בסטייט של רשימת מנות
    const filterdDish = dishList.filter((dish) => dish?.name !== name);
    if (filterdDish) {
      setDishList((prev) => [...prev]);
    }
    // שליחת הודעה תואמת למשתמש לאימות של ביצוע המחיקה
    if (window.confirm(`האם את/ה בטוח/ה שברצונך למחוק את המנה: ${name}`)) {
      setDishList(filterdDish);
    }
    return filterdDish;
  };
  // בכל פעם שיש שינוי ברשימת המנות אז שמירת אותה המנה בלוקאל סטורג
  useEffect(() => {
    localStorage.setItem("dishList", JSON.stringify(dishList));
  }, [dishList]);
  // החזרת הנתונים והפונקציות לאפליקציה כולה דרך הפובידר
  return (
    <DishContext.Provider
      value={{ createNewDish, dishList, deleteDish, getDish }}
    >
      {children}
    </DishContext.Provider>
  );
}

// החזרת ההוק למען גישה נוחה
export function useDish() {
  return useContext(DishContext);
}
