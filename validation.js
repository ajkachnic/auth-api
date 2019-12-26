let Joi = require("@hapi/joi");

const registerValidation = data => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(4).max(255).required().email(),
    password: Joi.string().min(12).required()
  });
  return schema.validate(data);
}
const loginValidation = data => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(255).required(),
    password: Joi.string().min(12).required()
  });
  return schema.validate(data);
}

module.exports = {
  registerValidation:registerValidation,
  loginValidation:loginValidation
}