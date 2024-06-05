const socketIo = require("socket.io");

// Initialiser Socket.IO avec le serveur HTTP
module.exports = (server) => {
  const socketIO = socketIo(server, {
    cors: {
      origin: "*",
      allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept"],
      transports: ["websocket", "polling"],
      credentials: true,
    },
  });

  socketIO.on("connection", (socket) => {
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
      socketIO.to(message.roomId).emit("message", {
        text: message.text,
        socketId: socket.id,
      });
    });

    // Gérer les déconnexions
    socket.on("disconnect", () => {
      console.log("A user disconnected: ", socket.id);
    });
  });

  return socketIO;
};
