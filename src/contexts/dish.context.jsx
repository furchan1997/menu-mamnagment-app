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

  // פונקציה שמקבלת את שם המנה ומחזירה אובייקט שמכיל את אותו שם המנה לצד המחיר
  const getDish = (name) => {
    // מחזירה את האיבר הראשון שרשום בו שם מנה תואם (לא תלוי באותיות גדולות/קטנות, מנקה רווחים)
    const getDishByName = dishList.find(
      (dish) => dish.name.toUpperCase().trim() === name.toUpperCase().trim() // השוואה זהה לשני הצדדים
    );
    return getDishByName;
  };

  // פונקציה אשר מוחקת את המנה לפי השם שלה
  const deleteDish = (NAME) => {
    // נבדק האם יש התאמה בין השם שהתקבל במידה וכן נעשה שינוי בסטייט של רשימת מנות
    const filterdDish = dishList.filter((dish) => dish?.name !== NAME);
    if (filterdDish) {
      setDishList((prev) => [...prev]);
    }
    // שליחת הודעה תואמת למשתמש לאימות של ביצוע המחיקה
    if (window.confirm(`האם את/ה בטוח/ה שברצונך למחוק את המנה: ${NAME}`)) {
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
