const express = require('express');
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  transports: ["websocket", "polling"]
});
const users = {};

io.on("connection", client => {
  console.log(`Cliente conectado: ${client.id}`);

  client.on("username", username => {
    const user = {
      name: username,
      id: client.id
    };
    users[client.id] = user;
    io.emit("connected", user);
    io.emit("users", Object.values(users));
  });

  client.on("send", message => {
    io.emit("message", {
      text: message,
      date: new Date().toISOString(),
      user: users[client.id]
    });
  });

  client.on("disconnect", () => {
    const username = users[client.id];
    delete users[client.id];
    io.emit("disconnected", client.id);
    console.log(`Cliente desconectado: ${client.id}`);
  });

  
});

const APP_PORT = 9000;

server.listen(APP_PORT, () => {
    console.log(`Servidor WebSocket em execução na porta ${APP_PORT}`);
});
