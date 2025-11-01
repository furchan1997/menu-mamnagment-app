// רכיב מותאם אישית להחזרת הודעת התראה מסוימת למשתמש
function Warning({ msg }) {
  return (
    <div className="warning-msg">
      <span>{msg}</span>
    </div>
  );
}

export default Warning;
