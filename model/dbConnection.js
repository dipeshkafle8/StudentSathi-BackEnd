const mongoose = require("mongoose");
let url = process.env.MONGO_URL;
mongoose
  .connect(url)
  .then(() => {
    console.log("Mongodb Connect Successfully");
  })
  .catch((err) => {
    console.log("Error in connecting DB");
  });
