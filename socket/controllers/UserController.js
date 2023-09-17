const Conversation = require("./../models/PrivateConversation")
const User = require("./../models/User")

// Function to add a user
const addUser = async(userId, socketId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, {socket: socketId})
        console.log(user.socket)
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}