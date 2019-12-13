const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("./config/passport");
const routes = require("./routes/index.route");
const port = process.env.PORT || 5000;

const app = express();

// Express Config

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Initiate passport and restore authentication state
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use("/api", routes);

// Listen

app.listen(port, () => console.log(`🚀 connected to port ${port} 🚀`));
