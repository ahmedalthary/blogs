const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const app = express();
app.use(express.json());
app.use(cors());

app.use("/", userRoutes);
app.use("/", blogRoutes);

(async () => {
  try {
    await sequelize.sync();
    app.listen(3000, "localhost", () => {
      console.log("Start listen on port 3000");
    });
    console.log("Connected to the database successfully");
  } catch (err) {
    console.log("Database connection failed", err);
  }
})();

app.use((req, res) => {
  res.status(404).json({ redirect: "/404" });
});
