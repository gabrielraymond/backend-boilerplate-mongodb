import Joi from "joi";

//Register Validation
const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().min(5),
    password: Joi.string().required().min(5),
    email: Joi.string().required().email(),
    status: Joi.string().required(),
    name: Joi.string(),
    address: Joi.string(),
    phoneNumber: Joi.string(),
    gender: Joi.string(),
  });

  return schema.validate(data);
};

//Login Validation
const loginValidation = (data) => {
  const schema = Joi.object({
    usernameOrEmail: Joi.string().required(),
    password: Joi.string().min(6),
  });

  return schema.validate(data);
};

export { registerValidation, loginValidation };
