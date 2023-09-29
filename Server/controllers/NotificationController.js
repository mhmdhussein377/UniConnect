const Notification = require("./../models/Notification")
const User = require("./../models/User")

const UpdateNotificationsStatus = async(req, res) => {
    const {notificationsIds} = req.body

    try {
        const updatedNotifications = await Promise.all(notificationsIds.map(async(notificationId) => {
            const updatedNotification = await Notification.findByIdAndUpdate(notificationId, {
                isRead: true
            }, {new: true})

            return updatedNotification
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

        const notifications = await Notification.find({recipient: userId, status: "pending"}).populate("sender")
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
            .filter(noti => noti.isRead === false && noti.status === "pending")
            .length

        return res
            .status(200)
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