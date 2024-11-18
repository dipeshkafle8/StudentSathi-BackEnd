const express = require("express");
const {
  handleFilterColleges,
  handleCarrierRoles,
} = require("../controllers/collegeDetails");
const collegeRoute = express.Router();

collegeRoute.post("/getCollege/:course", handleFilterColleges);
collegeRoute.post("/getRole/:role", handleCarrierRoles);

module.exports = {
  collegeRoute,
};
