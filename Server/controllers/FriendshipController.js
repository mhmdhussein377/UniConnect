const Friendship = require('./../models/Friendship')

const SendFriendRequest = async(req, res) => {
    const {recipientUserId} = req.params
    const senderUserId = req.user.id

    try {
        const existingFriendship = await Friendship.findOne({
            $or: [
                {
                    userOne: senderUserId,
                    userTwo: recipientUserId
                }, {
                    userOne: recipientUserId,
                    userTwo: senderUserId
                }
            ]
        })

        if (existingFriendship) 
            return res.status(400).json({message: "Friendship request already exists"});

        const newFriendship = new Friendship({userOne: senderUserId, userTwo: recipientUserId, status: "pending"})
        await newFriendship.save()

        res.status(200).json({ message: "Friend request sent successfully" });
        }
    catch (error) {
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = {
    SendFriendRequest
}