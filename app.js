require("dotenv").config();
require("./db");

const express = require("express");

const app = express();

require("./config")(app);

// 👇 Routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

// ❗ To handle errors
require("./error-handling")(app);

module.exports = app;
