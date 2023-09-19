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

const {getUsers, addUser} = require("./controllers/UserController");

const users = []

io.on("connection", (socket) => {
    socket.on("addUser", (userId) => {
        users[userId] = socket.id

        console.log(users)
    })

    socket.on("sendMessage", async({sender, receiver, content}) => {
        try {
            for(const key of users) {
                if(key === receiver) {
                    io.to(users[key]).emit('getMessage', {sender, content})
                    break
                }
            }

        } catch (error) {
            // Handle errors here
            console.error(error);
        }
    });

    socket.on('userDisconnect', () => {
        const userEntries = Object.entries(users)

        for(const [key, value] of userEntries) {
            if(value === socket.id) {
                delete users[key]
                break
            }
        }

        console.log(users)
    })

    // socket.on("friendRequestAccepted", (data) => {
    //     console.log(data, "dataaa");

    //     const userSocketId = data.receiverSocketId;

    //     io.to(userSocketId).emit("friendRequestAccepted", data);


    // });
})

console.log(users)

server.listen(3001, () => {
    console.log(`Socket.io server is running`);
});