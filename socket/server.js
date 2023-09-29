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
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

const users = new Map()
const rooms = new Map()

const roomsTest = new Map()

io.on("connection", (socket) => {

    socket.sockets = io.sockets

    socket.on("addUser", (userId) => {
        users.set(userId, socket.id);
    });

    socket.on("joinRoom", (roomName) => {

        socket.join(roomName);

        if (!roomsTest.has(roomName)) {
            roomsTest.set(roomName, new Set([socket.id]));
        } else {
            roomsTest
                .get(roomName)
                .add(socket.id);
        }

    })

    socket.on("sendMessage", async({sender, receiver, content, fileURL}) => {
        console.log(receiver, sender, content, "receiiiver")
        try {
            for (const [key,
                value]of users.entries()) {
                if (key === receiver) {
                    if (!fileURL && content) {
                        io
                            .to(value)
                            .emit("getMessage", {sender, content, receiver});
                        break
                    }
                    if (!content && fileURL) {
                        io
                            .to(value)
                            .emit("getMessage", {sender, fileURL, receiver})
                        break
                    }
                    if (fileURL && content) {
                        io
                            .to(value)
                            .emit("getMessage", {sender, receiver, content, fileURL})
                        break;
                    }
                }
            }
        } catch (error) {
            console.error(error);
        }
    });

    socket.on("sendGroupMessage", ({sender, senderName, content, roomName, fileURL}) => {
        try {
            if (roomsTest.has(roomName)) {
                io
                    .to(roomName)
                    .emit("getGroupMessage", {sender, senderName, content, fileURL, roomName})
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

    socket.on("connect_error", (error) => {
        console.error("WebSocket connection error:", error)
    })
})

server.listen(3001, () => {
    console.log(`Socket.io server is running`);
});