const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {mongoConnection} = require("./utils/mongoConnection");
const verifyToken = require("./utils/verifyToken");
const {handleError} = require("./utils/error");

const app = express();

const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server, {
    pingTmeout: 60000,
    cors: {
        origin: ["http://localhost:5173"]
    }
});

app.use(express.json());
dotenv.config();
app.use(cors());

const socketIoMiddleware = (req, res, next) => {
    if (req.url === "/socket.io") {
        verifyToken(req, res, next);
    } else {
        next();
    }
};

app.use(socketIoMiddleware);

const Conversations = require("./models/PrivateConversation");
const Users = require("./models/User");
// Function to add a user
const addUser = async(userId, socketId) => {
    try {
        const user = await Users.findByIdAndUpdate(userId, {
            online: true,
            socket: socketId
        });
        console.log(user);
    } catch (error) {
        throw error;
    }
};

// Function to get users in a conversation
const getUser = async(senderId, receiverId) => {
    try {
        const conversation = await Conversations.find({
            Members: {
                $all: [senderId, receiverId]
            }
        });

        if (!conversation) {
            throw new Error("conversation not found");
        }

        const user = conversation
            .Members
            .find((user) => user._id === receiverId);
        return user;
    } catch (error) {
        throw error;
    }
};

// Function to remove a user
const removeUser = async(userId) => {
    try {
        const user = await Users.findOneAndUpdate({
            socket: userId
        }, {online: false});
    } catch (error) {
        throw error;
    }
};

io.on("connection", (socket) => {
    socket.on("addUser", (userId) => {
        console.log("user is connected");
        addUser(userId, socket.id);
    });

    socket.on("sendMessage", ({senderId, receiverId, text}) => {
        const user = getUser(senderId, receiverId);
        io
            .to(user.socket)
            .emit("getMessage", {senderId, text});
    });

    socket.on("disconnect", () => {
        removeUser(socket.id);
    });
});

app.listen(process.env.PORT, () => {
    console.log("Server connected");
});

// Routes
const AuthRoutes = require("./routes/AuthRoutes");
const UserRoutes = require("./routes/UserRoutes");
const CommunityRoutes = require("./routes/CommunityRoutes");
const FriendshipRoutes = require("./routes/FriendshipRoutes");
const PrivateChatRoutes = require("./routes/PrivateChat");
const NotificationRoutes = require("./routes/NotificationRoutes");

app.use("/api", AuthRoutes);

app.use(verifyToken);

app.use("/api/user", UserRoutes);

app.use("/api/friendship", FriendshipRoutes);

app.use("/api/community", CommunityRoutes);

app.use("/api/notifications", NotificationRoutes);

app.use("/api/privateChat", PrivateChatRoutes);

app.use(handleError);

mongoConnection;
