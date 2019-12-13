// const passport = require("passport");
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import db from "./postgresql";
import bcrypt from "bcryptjs";

passport.use(
  new LocalStrategy(async (user, password, cb) => {
    console.log({ user, password });

    try {
      const query =
        "SELECT id, username, password FROM users WHERE username=$1";

      const { rows } = await db.query(query, [user]);

      console.log({ rows });

      // Find
      if (rows.length === 1) {
        const { 0: first } = rows;

        // Encrypt passwords and compare if they match

        // console.log({ passwordsMatch });

        // const match = await bcrypt.compare(password, first.password);

        console.log({ password, hash: first.password });

        cb(null, { id: first.id, user: first.username });
        // }

        // cb(null, first);
      } else {
        cb(null, false);
      }
    } catch (e) {
      console.log(e);
      return cb(e);
    }
  })
);

passport.serializeUser((user, done) => {
  console.log("serialize user");
  done(null, user.id);
});

passport.deserializeUser((id, cb) => {
  console.log("deserialize user");
  db.query(
    "SELECT id, username FROM users WHERE id = $1",
    [parseInt(id, 10)],
    (err, results) => {
      if (err) {
        // winston.error("Error when selecting user on session deserialize", err);
        return cb(err);
      }

      cb(null, results.rows[0]);
    }
  );
});

module.exports = passport;
