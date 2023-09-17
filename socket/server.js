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
        origin: ["http://localhost:5173"]
    }
});

const {getUsers, addUser} = require("./controllers/UserController");

io.on("connection", (socket) => {
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id)
    })

    socket.on("sendMessage", async({sender, receiver, content}) => {
        try {
            const user = await getUsers(sender, receiver);
            io
                .to(user[0].socket)
                .emit("getMessage", {sender, content});
        } catch (error) {
            // Handle errors here
            console.error(error);
        }
    });
})

server.listen(3001, () => {
    console.log(`Socket.io server is running`);
});