const router = require("express").Router();
const passport = require("../config/passport");
const auth = require("../controllers/auth.controller");

router.post("/", passport.authenticate("local"), auth.login);

module.exports = router;
