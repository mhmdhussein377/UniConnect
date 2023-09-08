const PrivateConversation = require("./../models/PrivateConversation")

const CreatePrivateConversation = async(req, res) => {
    const {userOne, userTwo} = req.body

    try {
        const newPrivateConversation = new PrivateConversation({
            Members: [userOne, userTwo]
        })
        const savedPrivateConversation = await newPrivateConversation.save()
        res.status(201).json(savedPrivateConversation)
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    CreatePrivateConversation
}