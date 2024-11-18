const express = require("express");
const jwt = require("jsonwebtoken");
const userAuth = express.Router();
userAuth.post("/", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ success: false, msg: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res
      .status(200)
      .json({ success: true, message: "Token is Valid", user: decoded });
  } catch (err) {
    return res.status(401).json({ success: false, msg: "Invalid token" });
  }
});

module.exports = { userAuth };
