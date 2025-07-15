import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: [
      "http://localhost:5173",
      "https://real-estate-react-js-eight.vercel.app",
    ],
    credentials: true,
  },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUser.push({ userId, socketId });
  } else {
    // Update the socket ID if user reconnects
    userExists.socketId = socketId;
  }
};

const removeUser = (socketId) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId) => {
    addUser(userId, socket.id);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    const receiver = getUser(receiverId);
    if (receiver) {
      io.to(receiver.socketId).emit("getMessage", data);
      // Also emit notification update
      io.to(receiver.socketId).emit("getNotification", {
        isRead: false,
        count: 1,
      });
    }
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(process.env.PORT || 4000, () => {
  console.log("Socket server is listening on port", process.env.PORT || 4000);
});
