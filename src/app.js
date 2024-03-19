const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://optimeet:xJ2IBCoQZOXqjI1F@cluster0.vnbqxlr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;

// Événement de succès de connexion
db.on("connected", function () {
  console.log("Connexion à la base de données MongoDB établie avec succès.");
});

// Événement d'erreur de connexion
db.on("error", function (err) {
  console.log("Erreur de connexion à la base de données MongoDB :", err);
});

// Événement lorsque la connexion est déconnectée
db.on("disconnected", function () {
  console.log("Connexion à la base de données MongoDB déconnectée.");
});

app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API Side Project!");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
