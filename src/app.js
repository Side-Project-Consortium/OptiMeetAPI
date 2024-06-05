const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./api/routes/userRoutes");
const logger = require("./api/middleware/logger");
const errorHandler = require("./api/middleware/errorHandler");
const corsMiddleware = require("./api/middleware/cors");
const { createServer } = require("https");
const socketIO = require("./socket");

const app = express();
const port = 443;

const server = createServer(app);
console.log("HTTPS server created");

const socket = socketIO(server);
console.log("Socket.IO initialized");

//Config et Middleware
app.use(errorHandler);
app.use(corsMiddleware);
app.use(logger);
app.use(bodyParser.json());
app.use("/api", userRoutes);

// mongoose
//   .connect(
//     "mongodb+srv://optimeet:xJ2IBCoQZOXqjI1F@cluster0.vnbqxlr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
//   )
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
