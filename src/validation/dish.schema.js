import joi from "joi";
// פונקציית ולידצייה יעודי להוספת מנות עם שימוש בג'וי
export function dishSchemaValidate(obj) {
  const schema = joi.object({
    name: joi.string().min(2).max(124).required(),
    price: joi.number().min(10).required(),
  });
  return schema.validate(obj, { abortEarly: false });
}
