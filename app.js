const express = require("express");
const { disconnect } = require("process");
const app = express();
const http = require("http").createServer(app);

const PORT = process.env.PORT || 3000;

let chatters = {};

http.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.static(__dirname + "/statics"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Socket
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  socket.on("join", (user) => {
    chatters[socket.id] = user;
    socket.broadcast.emit("join", chatters[socket.id]);
  });

  socket.on("message", (object) => {
    socket.broadcast.emit("message", object);
  });
  socket.on("disconnect", (obj) => {
    socket.broadcast.emit("left", chatters[socket.id]);
    
  });
});
