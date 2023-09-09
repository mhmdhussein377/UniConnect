const User = require('../models/User')
const Friendship = require('./../models/Friendship')
const Notification = require("./../models/Notification")

const SendFriendRequest = async(req, res) => {
    const {recipientUserId} = req.params;
    const senderUserId = req.user.id

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
        })

        if (existingFriendship) 
            return res.status(400).json({message: "Friendship request already exists"});
        
        const newFriendship = new Friendship({userOne: senderUserId, userTwo: recipientUserId})
        await newFriendship.save()

        const notification = new Notification({recipient: recipientUserId, sender: senderUserId, type: "friend request", content: `You received a friend request from ${sender.name}`});
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
    const actualUser = req.user.id
    const {recipientUserId} = req.params

    try {
        const sender = await User.findById(actualUser)
        const existingFriendship = await Friendship.findOne({
            $or: [
                {
                    userOne: actualUser,
                    userTwo: recipientUserId
                }, {
                    userOne: recipientUserId,
                    userTwo: actualUser
                }
            ]
        });

        if (!existingFriendship) 
            return res.status(400).json({message: "Friendship doesn't exist"})

        await existingFriendship.updateOne({status: "accepted"})

        const existingNotification = await Notification.findOne({recipient: actualUser, sender: recipientUserId, type: "friend request", isRead: false});

        if (!existingNotification) 
            return res.status(400).json({message: "Notification not found"})

        existingNotification.isRead = true
        await existingNotification.save()

        const acceptanceNotification = new Notification({recipient: recipientUserId, sender: actualUser, type: "friend request accepted", content: `You are now friends with ${sender.name}`});
        await acceptanceNotification.save();

        res.status(200).json({message: "Friendship status updated and notifications created successfully."});
    } catch (error) {
        res
            .status(500)
            .json({message: "Internal server error"});
    }
}

const RejectFriendRequest = async(req, res) => {
    const actualUser = req.user.id;
    const {recipientUserId} = req.params;

    try {
        const existingFriendship = await Friendship.findOne({
            $or: [
                {
                    userOne: actualUser,
                    userTwo: recipientUserId
                }, {
                    userOne: recipientUserId,
                    userTwo: actualUser
                }
            ]
        });

        if (!existingFriendship) 
            return res.status(400).json({message: "Friendship doesn't exist"});
        
        await existingFriendship.updateOne({status: "rejected"});

        const existingNotification = await Notification.findOne({recipient: actualUser, sender: recipientUserId, type: "friend request", isRead: false});

        if (!existingNotification) 
            return res.status(400).json({message: "Notification not found"});
        
        existingNotification.isRead = true;
        await existingNotification.save();

        res
            .status(200)
            .json({message: "Friendship status updated and notifications created successfully."});
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