const db = require("../config/postgresql");
const createError = require("http-errors");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

module.exports = {
  statusCheck: async (req, res, next) => {
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
    const { username, password } = req.body;

    if (!username || !password) {
      return next(createError(httpStatus.INTERNAL_SERVER_ERROR, "not found"));
    }

    const hashPassword = bcrypt.hashSync(password, salt);

    const q = `INSERT INTO users (username, password)
    VALUES ($1, $2)`;

    try {
      const response = await db.query(q, [username, hashPassword]);

      res.send({ status: 200, response: response.rows[0] });
    } catch (e) {
      console.log(e);
      next(e.stack);
    }
  }
};
