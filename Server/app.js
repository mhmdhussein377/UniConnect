const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const {mongoConnection} = require("./utils/mongoConnection")
const verifyToken = require("./utils/verifyToken")
const { handleError } = require("./utils/error")

const app = express()

app.use(express.json())
dotenv.config()
app.use(cors())

app.listen(process.env.PORT, () => {
    console.log("Server connected");
});

// Routes
const AuthRoutes = require("./routes/AuthRoutes")
const UserRoutes = require("./routes/UserRoutes")
const CommunityRoutes = require("./routes/CommunityRoutes");
const FriendshipRoutes = require("./routes/FriendshipRoutes")
const PrivateChatRoutes = require("./routes/PrivateChat")

app.use('/api', AuthRoutes)

app.use(verifyToken)

app.use("/api/user", UserRoutes)

app.use("/api/friendship", FriendshipRoutes)

app.use("/api/community", CommunityRoutes);

app.use("/api/privateChat", PrivateChatRoutes)

app.use(handleError)

mongoConnection