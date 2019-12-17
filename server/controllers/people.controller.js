const db = require("../config/postgresql");
const createError = require("http-errors");
const httpStatus = require("http-status");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

module.exports = {
  statusCheck: async (req, res, next) => {
    res.send({ status: 200, response: "OK" });
  },

  createTable: async (req, res, next) => {
    const q =
      "CREATE TABLE users ( id bigserial PRIMARY KEY, username varchar(255) UNIQUE, password varchar(100))";

    try {
      const response = await db.query(q);
      console.log({ response });
      res.send({ status: 200, response });
    } catch (e) {
      console.log(e);
    }
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
  },

  deleteUser: async (req, res, next) => {
    const { username, id } = req.body;

    if (!username || !id) {
      return next(
        createError(404, `Client error, username or id not provided`)
      );
    }

    try {
      const query = `DELETE FROM users WHERE username=$1 AND id=$2`;
      const { rowCount } = await db.query(query, [username, id]);
      console.log({ rowCount });

      if (!rowCount) {
        return next(createError(500, "No user found"));
      }

      res.send({ status: 200, response: { rowCount } });
    } catch (e) {
      console.log(e);
    }
  }
};
