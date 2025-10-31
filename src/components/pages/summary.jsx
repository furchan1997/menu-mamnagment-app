import { useAppNavigation } from "../../hooks/useAppNavigation";
import Btn from "../btn"; // שימוש ברכיב כפתור מותאם

//רכיב אשר מציג משפט פתיחה על מהות האפליקציה והדרכה בסיסית
function Summary() {
  // קבלת הפונקציה לניווט לכתובת ה-URL של יצירת מנה מההוק
  const { goToCreateDish } = useAppNavigation();

  return (
    <div className="summary">
      <h2>אפליקצייה לניהול תפריטים</h2>
      <p>כאן תוכלו להוסיף מנה יחד עם המחיר שלה וגם למחוק</p>
      <Btn description={"הוסף מנה"} fn={goToCreateDish} />
    </div>
  );
}

export default Summary;
