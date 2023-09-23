const Notification = require("./../models/Notification")
const User = require("./../models/User")

const UpdateNotificationsStatus = async(req, res) => {
    const {notifications} = req.body

    try {
        await Promise.all(notifications.map(async(notificationId) => {
            const updatedNotification = await Notification.findByIdAndUpdate(notificationId, {
                isRead: true
            }, {new: true})
        }))

        res
            .status(200)
            .json({message: "Notifications marked as read"});
    } catch (error) {
        res
            .status(500)
            .json({message: "Internal server error"});
    }
}

const GetNotifications = async(req, res) => {
    const userId = req
        ?.user
            ?.id

    try {
        const user = await User.findById(userId)
        if (!user) {
            return res
                .status(404)
                .json({message: "User not found"})
        }

        const notifications = await Notification.find({recipient: userId, isRead: false, status: "pending"})
        return res
            .status(200)
            .json({notifications})
    } catch (error) {
        return res
            .status(500)
            .json({message: "Internal server error"});
    }
}

const GetUnreadNotifications = async(req, res) => {
    const userId = req
        ?.user
            ?.id

    try {
        const user = await User.findById(userId)

        if (!user) {
            return res
                .status(404)
                .json({message: "User not found"})
        }

        const unreadNotifications = user
            .notifications
            .filter(noti => noti.isRead === false)
            .length

        return res
            .status(400)
            .json({unreadNotifications: unreadNotifications})
    } catch (error) {
        return res
            .status(500)
            .json({message: "Internal server error"});
    }
}

module.exports = {
    UpdateNotificationsStatus,
    GetNotifications,
    GetUnreadNotifications
}