const PrivateConversation = require("./../models/PrivateConversation")
const User = require("./../models/User")

const addUser = async(userId, socketId) => {
    try {
        const user = await User.findByIdAndUpdate(userId, {socket: socketId})
        console.log(user.socket)
    } catch (error) {
        return res.status(500).json({message: "Internal server error"})
    }
}

const getUsers = async(sender, receiver) => {
    try {
        const conversation = await PrivateConversation.findOne({members: {
            $all: [sender, receiver]
        }}).populate({path: "members", model: "User"})

        if(!conversation) {
            res.status(404).json({message: "Conversation not found"})
        }

        const user = conversation.members.filter(user => user._id.toString() === receiver)
        return user
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {getUsers, addUser}