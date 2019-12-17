require("dotenv").config();
const Pool = require("pg").Pool;

const pool = new Pool({
  user: process.env.AWS_DB_USERNAME,
  host: process.env.AWS_HOSTNAME,
  database: process.env.AWS_DB,
  password: process.env.AWS_PW,
  port: process.env.AWS_DB_PORT
});

const dbConnect = async () => {
  try {
    await pool.connect();
  } catch (e) {
    console.log(e);
  }
};

dbConnect();

module.exports = pool;
