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

// Function to get users in a conversation
const getUsers = async(sender, receiver) => {
    try {
        const conversation = await Conversation.findOne({Members: {
            $all: [sender, receiver]
        }}).populate({path: "Members", model: "User"})

        if(!conversation) {
            res.status(404).json({message: "Conversation not found"})
        }

        const user = conversation.Members.filter(user => user._id.toString() === receiver)
        console.log(user[0].socket)
        return user
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {getUsers, addUser}