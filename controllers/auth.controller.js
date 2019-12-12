const db = require("../config/postgresql");
const createError = require("http-errors");

module.exports = {
  login: async (req, res, next) => {
    const { user } = req;

    console.log({ user });

    res.send({ status: 200, response: "OK" });
    // const { name, email } = req.body;

    // console.log({ name, email });
    // if (!name || !email) {
    //   return next(createError(500, "Not able to login"));
    // }

    // res.redirect("/");
  }
};
