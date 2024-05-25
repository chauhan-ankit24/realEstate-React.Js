import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: 'https://real-estate-react-js-eight.vercel.app/',
        // origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true
    },
});

let onlineUser = [];

const addUser = (userId, socketId) => {
    const userExists = onlineUser.find((user) => user.userId === userId);
    if (!userExists) {
        onlineUser.push({ userId, socketId });
    }
};

const removeUser = (socketId) => {
    onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("newUser", (userId) => {
        addUser(userId, socket.id);
        console.log(`User added: ${userId}, socket: ${socket.id}`);
    });

    socket.on("sendMessage", ({ receiverId, data }) => {
        const receiver = getUser(receiverId);
        if (receiver) {
            io.to(receiver.socketId).emit("getMessage", data);
            console.log(`Message sent to ${receiverId}`);
        } else {
            console.log(`User with id ${receiverId} is not online`);
        }
    });

    socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.id}`);
        removeUser(socket.id);
    });
});

io.listen(4000, () => {
    console.log("Server is listening on port 4000");
});
