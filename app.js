const express = require("express");
const cors = require('cors')
const app = express();
app.use(cors({ origin: "https://angular-realtime-chatapp.herokuapp.com/" }));
const http = require("http");
const server= http.createServer(app);

const PORT = process.env.PORT || 3000;

let chatters = {};

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.static(__dirname + "/statics"));

app.get("/", (req, res) => {
  res.add
  res.sendFile(__dirname + "/index.html");
});

// Socket
const io = require("socket.io")(server, {
  cors: {
    origin: "https://angular-realtime-chatapp.herokuapp.com/",
    methods: ["GET", "POST"],
  },
});

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
