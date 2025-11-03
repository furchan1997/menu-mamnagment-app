import { useEffect, useState } from "react";
import { useDish } from "../../contexts/dish.context";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import Btn from "../btn";
import DishList from "../dishList";
import Input from "../input";
import Warning from "../../messages/warning.msg";
import ErrorMsg from "../../messages/error.msg";

function Dishes() {
  const { goToCreateDish } = useAppNavigation(); // שימוש בפונקציית אשר מנווטת לעמוד של יצירת מנה מההוק המותאם אישית
  const [search, setSearch] = useState(""); // סטייט שינהל את מצב הטקסט שיהיה בשדה הקלט לחיפוש מנה
  const [filterdDishs, setFilterdDishs] = useState(null); // סטייט שיקבל את המערך שנמצא בתוצאת חיפוש

  // קבלת פונקצייה למחיקת מנה, מציאת מנה לפי שם ואת מערך המנות עצמן מהקונטקסט
  const { dishList, deleteDish, getDish } = useDish();
  const [hasSearchError, setHasSearchError] = useState(false); // ניהול מצב שגיאה. מוצג כשאין תוצאות חיפוש תואמות או כשהשדה ריק

  useEffect(() => {
    // אם שדה החיפוש ריק – מאפסים את תוצאות הסינון והשגיאות
    if (search.trim() === "") {
      setFilterdDishs(null);
      setHasSearchError(false);
      return;
    }
    const found = getDish(search);
    // חיפוש מנות לפי שם, הפונקציה מחזירה מערך של כל המנות ששמן כולל את הטקסט שהוזן
    // אם נמצאו מנות תואמות, שמירה את מערך התוצאות בסטייט וביטול הודעת שגיאה
    if (found.length > 0) {
      setFilterdDishs(found);
      setHasSearchError(false);
    }
    // אם לא נמצאה אף מנה, איפוס את תוצאות הסינון והפעל הודעת שגיאה
    else {
      setFilterdDishs(null);
      setHasSearchError(true);
    }
  }, [search, dishList]);
  // האפקט יופעל בכל פעם שמשתנה טקסט החיפוש או שמתרחשת שינוי ברשימת המנות

  return (
    <div>
      {hasSearchError && <ErrorMsg msg={"אין התאמה של מנות"} />}
      <Input
        placeholder={"חפש מנה"}
        typeOfInput={"text"}
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <Btn description={"הוסף מנה"} fn={goToCreateDish} />
      {/* במידה ואין מנות מוצג הודעת תואמת ובמיקרה ויש נציג את המנות */}
      {dishList?.length === 0 ? (
        <Warning msg={"אין מנות לתצוגה"} />
      ) : (
        <div className="dishes-table-controller">
          <table>
            <thead>
              <tr>
                <th>שם המנה</th>
                <th>מחיר</th>
                <th>מחק</th>
              </tr>
            </thead>
            <tbody>
              {/* הצגת כל המנות בתפריט במידה ולא היה נסיון לחיפוש מנות */}
              {search.trim() === "" &&
                [...dishList] // שכפול כדי לא לשנות את המערך המקורי
                  .reverse() // פונקציה שהופכת את סדר האיברים במערך
                  .map((dish) => (
                    <DishList
                      key={dish.name}
                      name={dish.name}
                      price={dish.price}
                      dishDelete={() => deleteDish(dish.name)}
                    />
                  ))}
              {/* מציג את המנות התואמות לשם שהוזן בשדה החיפוש */}
              {filterdDishs &&
                search.trim() !== "" &&
                filterdDishs.map((filterDish) => (
                  <DishList
                    key={filterDish.name}
                    name={filterDish.name}
                    price={filterDish.price}
                    dishDelete={() => deleteDish(filterDish.name)}
                  />
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Dishes;
