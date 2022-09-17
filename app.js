// imports
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());

// Routes

const apiV1Routes = require("./routes.js");
app.use("/", apiV1Routes);

module.exports = app;
