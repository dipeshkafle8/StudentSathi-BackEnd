const Joi = require("joi");

//to validate user inputs
const signupValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });

  //it will return error if exists
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ messgae: "Bad request", error });
  }
  next();
};

//login starts here
const loginValidation = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(4).max(100).required(),
  });
  
  //it will return error if exists
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ messgae: "Bad request", error });
  }
  next();
};

module.exports = {
  loginValidation,
  signupValidation,
};
