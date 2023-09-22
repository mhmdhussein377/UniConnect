const User = require('../models/User')
const Friendship = require('./../models/Friendship')
const Notification = require("./../models/Notification")
const PrivateConversation = require("./../models/PrivateConversation")

const GetFriendship = async(req, res) => {
    const {username} = req.params
    const currentUserId = req
        ?.user
            ?.id

    try {
        const currentUser = await User.findById(currentUserId)
        const user = await User.findOne({username})
        if (!currentUser || !user) {
            return res
                .statsu(404)
                .json({message: 'User not found'})
        }

        const friendship = await Friendship.find({
            $or: [
                {
                    userOne: user._id,
                    userTwo: currentUserId
                }, {
                    userOne: currentUserId,
                    userTwo: user._id
                }
            ]
        })

        return res
            .status(200)
            .json({friendship})
    } catch (error) {
        res
            .status(500)
            .json({message: "Internal server error"});
    }
}

const SendFriendRequest = async(req, res) => {
    const {recipientUserId} = req.params;
    const senderUserId = req
        ?.user
            ?.id

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

        if (existingFriendship && existingFriendship.status === "pending") {
            return res
                .status(400)
                .json({message: "There is already a pending relationship"})
        }

        if (sender.friends.includes(recipientUserId)) {
            return res
                .status(200)
                .json({message: `You are already frineds`});
        }

        if (existingFriendship && existingFriendship.status === "rejected") {
            existingFriendship.status = "pending"
            existingFriendship.save()
            const notification = new Notification({recipient: recipientUserId, sender: senderUserId, type: "friend request", content: `You received a friend request from ${sender.name}`});
            await notification.save();

            return res
                .status(200)
                .json({message: "Friend request sent successfully"});
        }

        const newFriendship = new Friendship({userOne: senderUserId, userTwo: recipientUserId, requester: senderUserId})
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
    const currentUser = req
        ?.user
            ?.id
    const {recipientUserId} = req.params

    try {
        const sender = await User.findById(currentUser)
        const recipient = await User.findById(recipientUserId)

        if (!sender) {
            return res
                .status(400)
                .json("Sender not found")
        }

        if (!recipient) {
            return res
                .status(400)
                .json("Recipient not found")
        }

        const existingFriendship = await Friendship.findOne({
            $or: [
                {
                    userOne: currentUser,
                    userTwo: recipientUserId,
                    requester: recipientUserId
                }, {
                    userOne: recipientUserId,
                    userTwo: currentUser,
                    requester: recipientUserId
                }
            ]
        });

        if (!existingFriendship) 
            return res.status(400).json({message: "Friendship doesn't exist"})

        if (existingFriendship.status === "accepted") {
            return res
                .status(400)
                .json({message: "You are already friends"})
        }

        if (existingFriendship.status === "rejected") {
            return res
                .status(400)
                .json({message: "You can't reject an accepted relationship"});
        }

        await existingFriendship.updateOne({status: "accepted"})

        const existingNotification = await Notification.findOne({recipient: currentUser, sender: recipientUserId, type: "friend request", isRead: false});

        if (!existingNotification) 
            return res.status(400).json({message: "Notification not found"})

        existingNotification.status = "accepted"
        existingNotification.isRead = true
        await existingNotification.save()

        sender
            .friends
            .push(recipientUserId)
        await sender.save()

        recipient
            .friends
            .push(currentUser)
        await recipient.save()

        const acceptanceNotification = new Notification({recipient: recipientUserId, sender: currentUser, type: "friend request accepted", content: `You are now friends with ${sender.name}`});
        await acceptanceNotification.save();

        const existingConversation = await PrivateConversation.findOne({
            members: [currentUser, recipientUserId]
        })
        if(!existingConversation) {
            const newPrivateConversation = new PrivateConversation({members: [currentUser, recipientUserId]})
            await newPrivateConversation.save()
        }

        res
            .status(200)
            .json({message: "Friendship status updated and notifications created successfully."});
    } catch (error) {
        res
            .status(500)
            .json({message: "Internal server error"});
    }
}

const CancelFriendRequest = async(req, res) => {
    const currentUser = req
        ?.user
            ?.id;
    const {recipientUserId} = req.params;

    try {
        const existingFriendship = await Friendship.findOne({
            $or: [
                {
                    userOne: currentUser,
                    userTwo: recipientUserId,
                    requester: currentUser,
                }, {
                    userOne: recipientUserId,
                    userTwo: currentUser,
                    requester: currentUser,
                }
            ]
        });

        if (!existingFriendship) {
            return res
                .status(400)
                .json({message: "Friendship doesn't exist"});
        }

        if (existingFriendship.status !== "pending") {
            return res
                .status(400)
                .json({message: "Friendship request has already been accepted or rejected"});
        }

        await Friendship.findByIdAndDelete(existingFriendship._id);

        await Notification.findOneAndDelete({recipient: recipientUserId, sender: currentUser, type: "friend request"});

        res
            .status(200)
            .json({message: "Friendship request canceled successfully"});
    } catch (error) {
        res
            .status(500)
            .json({message: "Internal server error"});
    }
};

const Unfriend = async(req, res) => {
    const currentUser = req
        ?.user
            ?.id
    const {friendUserId} = req.params

    try {
        const existingFriendship = await Friendship.findOne({
            $or: [
                {
                    userOne: currentUser,
                    userTwo: friendUserId,
                    status: "accepted"
                }, {
                    userOne: friendUserId,
                    userTwo: currentUser,
                    status: "accepted"
                }
            ]
        });

        if (!existingFriendship) {
            return res
                .status(400)
                .json({message: "Friendship not found"});
        }

        const currentUserObj = await User.findById(currentUser);
        const friendUserObj = await User.findById(friendUserId);

        if (!currentUserObj || !friendUserObj) {
            return res
                .status(400)
                .json({message: "User not found"});
        }

        await Friendship.findByIdAndDelete(existingFriendship._id)

        currentUserObj.friends = currentUserObj
            .friends
            .filter((friend) => friend.toString() !== friendUserId);

        friendUserObj.friends = friendUserObj
            .friends
            .filter((friend) => friend.toString() !== currentUser);

        await currentUserObj.save();
        await friendUserObj.save();

        res
            .status(200)
            .json({message: "Friend removed successfully"});

    } catch (error) {
        res
            .status(500)
            .json({message: "Internal server error"});
    }
}

const RejectFriendRequest = async(req, res) => {
    const currentUser = req
        ?.user
            ?.id;
    const {recipientUserId} = req.params;

    try {
        const existingFriendship = await Friendship.findOne({
            $or: [
                {
                    userOne: currentUser,
                    userTwo: recipientUserId,
                    requester: recipientUserId
                }, {
                    userOne: recipientUserId,
                    userTwo: currentUser,
                    requester: recipientUserId
                }
            ]
        });

        if (!existingFriendship) 
            return res.status(400).json({message: "Friendship doesn't exist"});

        if(existingFriendship.status === "accepted") {
            return res.status(400).json({message: "You can't reject an accepted friendship"})
        }

        if(existingFriendship.status === "rejected") {
            return res.status(400).json("You can't reject a rejected friendship")
        }
        
        await existingFriendship.updateOne({status: "rejected"});

        const existingNotification = await Notification.findOne({recipient: currentUser, sender: recipientUserId, type: "friend request", isRead: false});

        if (!existingNotification) 
            return res.status(400).json({message: "Notification not found"});

        existingNotification.status = "rejected";
        existingNotification.isRead = true;
        await existingNotification.save();

        res
            .status(200)
            .json({message: "Friendship status updated and notifications updated successfully."});
    } catch (error) {
        res
            .status(500)
            .json({message: "Internal server error"});
    }
};

module.exports = {
    SendFriendRequest,
    AcceptFriendRequest,
    RejectFriendRequest,
    CancelFriendRequest,
    Unfriend,
    GetFriendship
}