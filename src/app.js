const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./api/routes/userRoutes");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use("/api", userRoutes);

mongoose
  .connect(
    "mongodb+srv://optimeet:xJ2IBCoQZOXqjI1F@cluster0.vnbqxlr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
