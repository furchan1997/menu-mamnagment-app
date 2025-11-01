import Btn from "./btn";

// רכיב גנרי אשר יטפל ברשימת מנות
function DishList({ id, name, price, dishDelete = () => {} }) {
  return (
    <>
      <tr>
        <td>{name}</td>
        <td>{price}</td>
        <td>
          <Btn description={"מחק מנה"} fn={dishDelete} />
        </td>
      </tr>
    </>
  );
}

export default DishList;
