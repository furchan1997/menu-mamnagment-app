// יצירת רכיב אינפוט גנרי אשר ישמש אותנו לכל פעם שנצטרך שימוש בשדה קלט מכל סוג שהוא
function Input({ description, typeOfInput, error, ...rest }) {
  return (
    <div className="input-controller">
      {error && <div className="error-message">{error} </div>}
      <label htmlFor={rest.name}>
        {description}{" "}
        {rest.required && <span className="required-felid">*</span>}
      </label>
      <input type={typeOfInput} {...rest} />
    </div>
  );
}

export default Input;
