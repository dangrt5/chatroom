const express = require("express");
const people = require("../controllers/people.controller");
const passport = require("passport");

const router = express.Router();

router.post("/status-check", people.statusCheck);

router.get("/", people.retrieveAll);

router.post("/add", people.addUser);

router.delete("/delete", people.deleteUser);

module.exports = router;
