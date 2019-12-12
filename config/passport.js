const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./postgresql");

passport.use(
  new LocalStrategy(async (username, password, cb) => {
    console.log({ username, password });

    try {
      const query =
        "SELECT id, username, password, type FROM users WHERE username=$1";

      const { rows } = await db.query(query, [username]);

      console.log({ rows });

      // Find
      if (rows.length > 0) {
        const first = rows[0];

        //

        cb(null, { id: first.id, username: first.username, type: first.type });

        // cb(null, first);
      } else {
        cb(null, false);
      }
    } catch (e) {
      return cb(e);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, cb) => {
  db.query(
    "SELECT id, username, type FROM users WHERE id = $1",
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
