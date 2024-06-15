const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const progressRoutes = require("./routes/progressRoutes");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());

app.use("/api", authRoutes);
app.use("/api", courseRoutes);
app.use("/api", progressRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});
