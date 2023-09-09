const User = require('../models/User')
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
        
        const newFriendship = new Friendship({userOne: senderUserId, userTwo: recipientUserId})
        await newFriendship.save()

        const notification = new Notification({user: recipientUserId, sender: senderUserId, type: "friend request", content: "You received a friend request from [Sender Name]."});
        await notification.save()

        res
            .status(200)
            .json({message: "Friend request sent successfully"});
    } catch (error) {
        res
            .status(500)
            .json({message: "Internal server error"});
    }
}

const AcceptFriendRequest = async(req, res) => {
    const senderUserId = req.user.id
    const {recipientUserId} = req.params

    try {
        const sender = await User.findById(senderUserId)
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
        });

        if (!existingFriendship) 
            return res.status(400).json({message: "Friendship doesn't exist"})

        await existingFriendship.updateOne({status: "accepted"})

        const notification = new Notification({user: recipientUserId, sender: senderUserId, type: "friend request", content: `You are now friends with ${sender.name}.`});
        await notification.save()

        console.log("Friendship status updated and notifications created successfully.");
    } catch (error) {
        res
            .status(500)
            .json({message: "Internal server error"});
    }
}

const RejectFriendRequest = async(req, res) => {
    const senderUserId = req.user.id;
    const {recipientUserId} = req.params;

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
        });

        if (!existingFriendship) 
            return res.status(400).json({message: "Friendship doesn't exist"});
        
        await existingFriendship.updateOne({status: "rejected"});

        console.log("Friendship status updated and notifications created successfully.");
    } catch (error) {
        res
            .status(500)
            .json({message: "Internal server error"});
    }
}

module.exports = {
    SendFriendRequest,
    AcceptFriendRequest,
    RejectFriendRequest
}