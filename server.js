// const express = require("express");
// const app = express();
const cors = require("cors");

const io = require("socket.io")(3000, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

// on user connection creates a new socket for the user
io.on("connection", (socket) => {
  // send a message through the socket to the user
  socket.emit("chat-message", "Hi buddy!!!!!");
  socket.on("send-chat-message", (message) => {
    socket.broadcast.emit("chat-message", message);
  });
});
