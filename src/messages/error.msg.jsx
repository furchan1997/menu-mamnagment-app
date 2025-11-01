// רכיב מותאם אישית להחזרת הודעת שגיאה למשתמש
function ErrorMsg({ msg }) {
  return (
    <div className="error-message">
      <span>{msg}</span>
    </div>
  );
}

export default ErrorMsg;
