import { useAppNavigation } from "../../hooks/useAppNavigation";
import Btn from "../btn";
// רכיב של יצירת מנה חדשה
function CreateDish() {
  const { goHome } = useAppNavigation(); // שימוש בפונקציה חזרה לעמוד הבית שקיבלנו מההוק המותאם אישית

  return (
    <div>
      <h2>צרו מנה חדשה</h2>
      <Btn description={"חזרה למסך הבית"} fn={goHome} />
    </div>
  );
}

export default CreateDish;
