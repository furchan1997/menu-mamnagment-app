// רכיב כפתור גנרי עם שליחת פרופס רלוונטיים
function Btn({ typeOfBtn = "submit", description, btnClass = "btn", fn }) {
  return (
    <button type={typeOfBtn} className={btnClass} onClick={fn}>
      {description}
    </button>
  );
}

export default Btn;
