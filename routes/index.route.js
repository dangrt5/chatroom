const express = require("express");
const router = express.Router();
const people = require("./people.route");
const auth = require("./auth.route");
const pool = require("../config/postgresql");

router.use("/status-check", (req, res, next) => {
  res.send({ status: 200, response: "OK" });
});

router.use("/auth", auth);

router.use("/people", people);

module.exports = router;
