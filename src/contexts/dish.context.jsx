import { createContext, useContext, useState } from "react";

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
  // כל מנה מקבלת מזהה ייחודי ומתווספת למערך
  const createNewDish = (value) => {
    setDishList((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...value,
      },
    ]);
  };

  // החזרת הנתונים והפונקציות לאפליקציה כולה דרך ה-Provider
  return (
    <DishContext.Provider value={{ createNewDish, dishList }}>
      {children}
    </DishContext.Provider>
  );
}

// החזרת ההוק למען גישה נוחה
export function useDish() {
  return useContext(DishContext);
}
