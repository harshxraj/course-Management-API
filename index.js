const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const progressRoutes = require("./routes/progressRoutes");

const app = express();
app.use(bodyParser.json());

app.use("/api", authRoutes);
app.use("/api", courseRoutes);
app.use("/api", progressRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
