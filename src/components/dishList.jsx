import Btn from "./btn";

// רכיב גנרי אשר יטפל ברשימת מנות
function DishList({ id, name, price, deleteDish }) {
  return (
    <div>
      <h2>שם מנה: {name} </h2>
      <p>{price} ש''ח</p>
      <Btn description={"מחק מנה"} fn={deleteDish} />
      <p>{id}</p>
    </div>
  );
}

export default DishList;
