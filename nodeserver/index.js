//node server will handle connections
const io = require("socket.io")(process.env.PORT||8000, {
  cors: {
    origin: "*",
  },
});
//we are running socket on port 8000

const users = {};



io.on("connection", (socket) => {
  socket.on("new-user-joined", (name) => {
    users[socket.id] = name;
    socket.broadcast.emit("user-joined", name); //to broadcast msg to other users
  });
  socket.on("send", (message) => {
   
    socket.broadcast.emit("receive", {
      message: message,
      name: users[socket.id],
    });
  });

  socket.on("disconnect", (message) => {
    socket.broadcast.emit("left", users[socket.id]);
    delete users[socket.id];
  });
});
