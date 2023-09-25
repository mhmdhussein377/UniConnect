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
        origin: ["http://localhost:5173", "http://localhost:5174"],
        methods: ["GET", "POST"]
    }
});

const users = new Map()

io.on("connection", (socket) => {

    socket.on("addUser", (userId) => {
        users.set(userId, socket.id);
    });

    socket.on("sendMessage", async({sender, receiver, content}) => {
        try {
            for (const [key,
                value]of users.entries()) {
                if (key === receiver) {
                    if(!fileURL) {
                        io.to(value).emit("getMessage", {sender, content});
                    }
                    
                    break;
                }
            }
        } catch (error) {
            console.error(error);
        }
    });

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