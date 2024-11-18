const express = require("express");
const { collegeRoute } = require("./routes/collegeRoute");
const { userRoute } = require("./routes/userRoute");
const { userAuth } = require("./routes/authUser");
const cors = require("cors");

require("dotenv").config();
require("./model/dbConnection");

let port = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Handling routes
app.use("/getdata", collegeRoute);
app.use("/user", userRoute);
app.use("/checkAuthUser", userAuth);

app.get("/", (req, res) => {
  res.send("Hello I am sending Data");
});

app.listen(port, () => {
  console.log(`Server running successfully at port ${port}`);
});
