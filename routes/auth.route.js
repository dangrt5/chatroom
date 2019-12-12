const router = require("express").Router();
const passport = require("../config/passport");
const auth = require("../controllers/auth.controller");
const db = require("../config/postgresql");

console.log({ auth: auth.login });

router.post("/", passport.authenticate("local"), auth.login);

module.exports = router;
