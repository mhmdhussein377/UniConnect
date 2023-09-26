const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const http = require("http");
const mongoose = require("mongoose");

const app = express()

app.use(express.json());
dotenv.config();
app.use(cors());

const server = http.createServer(app);

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Database connected");
    });

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174"]
    }
});

const users = new Map()
const rooms = new Map()

io.on("connection", (socket) => {

    socket.sockets = io.sockets

    socket.on("addUser", (userId) => {
        users.set(userId, socket.id);
    });

    socket.on("joinRoom", (roomName) => {
        console.log("joinRoom")
        if (!rooms.has(roomName)) {
            rooms.set(roomName, [socket.id])
            socket.join(roomName)
        } else {
            rooms
                .get(roomName)
                .push(socket.id)
        }
    })

    socket.on("sendMessage", async({sender, receiver, content, fileURL}) => {
        try {
            for (const [key,
                value]of users.entries()) {
                if (key === receiver) {
                    if (!fileURL) {
                        io
                            .to(value)
                            .emit("getMessage", {sender, content});
                        break
                    }
                    if (!content) {
                        to
                            .to(value)
                            .emit("getMessage", {sender, fileURL})
                        break
                    }
                    io
                        .to(value)
                        .emit("getMessage", {sender, content, fileURL})
                    break;
                }
            }
        } catch (error) {
            console.error(error);
        }
    });

    socket.on("sendGroupMessage", ({sender, senderName, content, roomName}) => {
        try {
            if (rooms.has(roomName)) {
                const roomUsers = rooms.get(roomName)
                roomUsers.forEach((user) => {
                    io
                        .to(user)
                        .emit("getGroupMessage", {sender, senderName, content});
                })
            }
        } catch (error) {
            console.log(error)
        }
    })

    socket.on("leaveRoom", ({roomName, userId}) => {
        if (rooms.has(roomName)) {
            rooms
                .get(roomName)
                .delete(userId)
        }
    })

    socket.on("disconnectUser", (userId) => {
        for (const [key,
            value]of users.entries()) {
            if (key === userId) {
                console.log(`Socket disconnected: ${value}`);
                users.delete(key);
                break;
            }
        }
    });
})

server.listen(3001, () => {
    console.log(`Socket.io server is running`);
});