const express = require("express");
const people = require("../controllers/people.controller");

const router = express.Router();

router.get("/", people.retrieveAll);

router.post("/status-check", people.statusCheck);

router.post("/add", people.addUser);

module.exports = router;
