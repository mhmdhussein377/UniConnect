const Notification = require("./../models/Notification")
const User = require("./../models/User")
const Community = require("./../models/Community")

const UpdateNotificationStatus = async(req, res) => {
    const {notificationId} = req.params

    try {
        const notification = await Notification.findById(notificationId)

        if (!notification) 
            return res.status(404).json({error: "Notification not found"})

        await notification.updateOne({isRead: true})

        res
            .status(200)
            .json({message: "Notification marked as read"});
    } catch (error) {
        res
            .status(500)
            .json({message: "Internal server error"});
    }
}

const AcceptCommunityJoinRequest = async(req, res) => {
    const {notificationId} = req.params
    const userId = req.user.id

    try {
        const user = User.findById(userId)
        const notification = Notification.findById(notificationId)

        if (!user) 
            return res.status(404).json({message: "User not found"})
        if (!notification) 
            return res.status(404).json({message: "Notification not found"})
        if (notification.type !== "request to join a community") 
            return res.status(400).json({message: "Invalid notification type"});

        const community = await Community.findOne({_id: notification.community, creator: userId})

        if(!community)
            return res.status(404).json({message: "Community not found"})

        notification.isRead = true
        await notification.save()

        community.members.push(userId)
        await community.save()

        res.status(200).json({ message: "Community join request accepted" });
    } catch (error) {
        res
            .status(500)
            .json({message: "Internal server error"});
    }
}

module.exports = {
    UpdateNotificationStatus,
    AcceptCommunityJoinRequest
}