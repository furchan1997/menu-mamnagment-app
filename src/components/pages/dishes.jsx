import { useDish } from "../../contexts/dish.context";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import Btn from "../btn";
import DishList from "../dishList";

function Dishes() {
  const { goToCreateDish } = useAppNavigation(); // שימוש בפונקציית אשר מנווטת לעמוד של יצירת מנה מההוק המותאם אישית
  const { dishList } = useDish(); // קבלת רשימת המנות מהקונטקסט

  return (
    <div>
      <h2>להלן רשימת המנות, ניתן גם למחוק לפי רצונך</h2>
      <Btn description={"הוסף מנה"} fn={goToCreateDish} />
      {/* במידה ואין מנות מוצג הודעת תואמת ובמיקרה ויש נציג את המנות */}
      {dishList?.length === 0
        ? "אין מנות בתפריט"
        : dishList.map((dish) => (
            <DishList name={dish?.name} price={dish?.price} key={dish?.id} />
          ))}
    </div>
  );
}

export default Dishes;
