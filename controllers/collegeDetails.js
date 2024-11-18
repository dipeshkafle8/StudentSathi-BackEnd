const fs = require("fs");
const path = require("path");

//to filter colleges
function handleFilterColleges(req, res) {
  fs.readFile(
    path.resolve(__dirname, `../colleges/${req.params.course}.json`),
    "utf-8",
    (err, data) => {
      if (err) {
        res.send({ msg: "Error" });
      } else {
        if (req.body.location != "None") {
          data = JSON.parse(data);
          let colleges = data.filter((value) => {
            return value.state === req.body.location;
          });
          res.send(colleges);
        } else {
          res.send(data);
        }
      }
    }
  );
}

//to send selected carrier roles
function handleCarrierRoles(req, res) {
  fs.readFile(
    path.resolve(__dirname, `../roles/${req.params.role}.json`),
    "utf-8",
    (err, data) => {
      if (err) {
        res.send({ msg: "Error" });
      } else {
        res.send(data);
      }
    }
  );
}

module.exports = {
  handleCarrierRoles,
  handleFilterColleges,
};
