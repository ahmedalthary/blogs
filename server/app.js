const express = require("express");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");
const app = express();

