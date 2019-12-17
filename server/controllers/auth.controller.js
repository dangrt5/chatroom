import db from "../config/postgresql";
import createError from "http-errors";
import { isEmpty } from "ramda";

module.exports = {
  login: async (req, res, next) => {
    const { user } = req;

    if (isEmpty(user)) {
      return next(createError(404, "User not found"));
    }

    res.send({ status: 200, response: user });
  }
};
