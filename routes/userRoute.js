const express = require("express");
const { handleLogin, handleSignUp } = require("../controllers/loginSignUp");
const {
  loginValidation,
  signupValidation,
} = require("../middlewares/authValidation");
const userRoute = express.Router();

userRoute.post("/signup", signupValidation, handleSignUp);
userRoute.post("/login", loginValidation, handleLogin);

module.exports = { userRoute };
