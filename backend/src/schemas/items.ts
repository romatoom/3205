import Joi from "joi";

const schema = Joi.object()
  .options({ abortEarly: false })
  .keys({
    email: Joi.string()
      .email()
      .messages({
        "string.email": `"Email" must be valid email`,
        "string.empty": `"Email" must be a valid email address`,
      })
      .required(),

    number: Joi.string()
      .regex(/^[0-9]{6}$/)
      .messages({
        "string.pattern.base": `"Number" must have 6 digits (ex. 12-34-56)`,
      }),
  });

export default schema;
