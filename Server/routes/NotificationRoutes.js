const express = require("express");
const router = express.Router();
const {GetNotifications, GetUnreadNotifications, UpdateNotificationsStatus} = require("./../controllers/NotificationController");

router.get("/", GetNotifications)

router.post("/updateNotificationsStatus", UpdateNotificationsStatus)

router.get("/unreadNotifications", GetUnreadNotifications)

module.exports = router;
