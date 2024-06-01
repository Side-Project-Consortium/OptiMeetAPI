const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./api/routes/userRoutes");
const logger = require("./api/middleware/logger");
const errorHandler = require("./api/middleware/errorHandler");
const corsMiddleware = require("./api/middleware/cors");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const port = 3001;

app.use(corsMiddleware);
app.use(logger);
app.use(bodyParser.json());
app.use("/api", userRoutes);

// Créer un serveur HTTP
const server = http.createServer(app);
console.log("HTTP server created");

// Initialiser Socket.IO avec le serveur HTTP
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ["websocket", "polling"],
});
console.log("Socket.IO initialized");

mongoose
  .connect(
    "mongodb+srv://optimeet:xJ2IBCoQZOXqjI1F@cluster0.vnbqxlr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Gestion des connexions Socket.IO
io.on("connection", (socket) => {
  console.log("A user connected: ", socket.id);

  // Rejoindre une room spécifique
  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} joined room ${room}`);
  });

  // Gestion des messages
  socket.on("message", (message) => {
    console.log("Message received:", message);
    // Émettre le message à tous les clients dans la même room
    io.to(message.room).emit("message", message);
  });

  // Déconnexion de l'utilisateur
  socket.on("disconnect", () => {
    console.log("User disconnected: ", socket.id);
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
