const { User } = require("../model/DbSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function handleSignUp(req, res) {
  try {
    const userData = req.body;

    //if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.status(409).json({
        message: "User is already exist,you can log gin",
        success: false,
      });
    }
    //to encrypt the password
    userData.password = await bcrypt.hash(userData.password, 10);

    await User.create(userData);

    res.status(201).json({ success: true, msg: "User created successfully" });
  } catch (err) {
    console.error(err);
    // Send failure response
    res.status(400).json({ success: false, msg: "Unable to create User" });
  }
}

async function handleLogin(req, res) {
  try {
    const userData = req.body;

    const user = await User.findOne({
      username: userData.username,
    });

    const errorMsg = "Authentication failed email or password is wrong";
    if (!user) {
      return res.status(401).json({ message: errorMsg, success: false });
    }
    //comparing password
    const isPassEqual = await bcrypt.compare(userData.password, user.password);
    if (!isPassEqual) {
      return res.status(403).json({ message: errorMsg, success: false });
    }
    //for generating jwt token
    const jwtToken = jwt.sign(
      {
        username: user.username,
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      message: "Login success",
      success: true,
      jwtToken,
      email: user.email,
      username: user.username,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false });
  }
}

module.exports = {
  handleLogin,
  handleSignUp,
};
