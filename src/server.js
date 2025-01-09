const express = require("express");
const http = require("http");
const path = require("path");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);

// Config
require("dotenv").config({ path: `${__dirname}/.env` });
app.set("PORT", process.env.PORT);

// Middlewares
app.use(express.static(path.resolve(__dirname, "../public")));

// Database
require("./database/database");

// Socket.io
module.exports.io = socketIO(server);
require("./sockets/socket");

// Server
server.listen(app.get("PORT"), () => {
  console.log("App listening on port ", app.get("PORT"));
});

// Add a connect listener
module.exports.io.on("connection", (socket) => {
  console.log("Client connected.");
  socket.on("disconnect", () => {
    console.log("Client disconnected.");
  });
});
