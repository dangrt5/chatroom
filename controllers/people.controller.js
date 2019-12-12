const db = require("../config/postgresql");
const createError = require("http-errors");
const httpStatus = require("http-status");

module.exports = {
  statusCheck: async (req, res, next) => {
    const { test } = req.body;

    if (!test) {
      return next(createError(404, "req body not being parsed"));
    }

    console.log({ test });

    res.send({ status: 200, response: "OK" });
  },

  retrieveAll: async (req, res, next) => {
    const q = `SELECT * FROM users`;

    try {
      const { rows } = await db.query(q);
      console.log({ rows });
      res.send({ status: 200, response: rows });
    } catch (e) {
      return next(e);
    }
  },

  addUser: async (req, res, next) => {
    const { name, email } = req.body;

    if (!name || !email) {
      return next(createError(httpStatus.INTERNAL_SERVER_ERROR, "not found"));
    }

    const q = `INSERT INTO users (name, email)
    VALUES ($1, $2)`;

    try {
      const response = await db.query(q, [name, email]);

      res.send({ status: 200, response: response.rows[0] });
    } catch (e) {
      console.log(e);
      next(e.stack);
    }
  }
};
