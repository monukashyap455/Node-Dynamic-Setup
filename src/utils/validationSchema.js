import Joi from "joi";

const indiaNumberRegex = /^\+91[6-9]\d{9}$/;

export const studentRegisterSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  mobileNumber: Joi.string().regex(indiaNumberRegex).required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
});


