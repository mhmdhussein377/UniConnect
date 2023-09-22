const express = require("express");
const router = express.Router();
const {GetNotifications, GetUnreadNotifications} = require("./../controllers/NotificationController");

router.get("/", GetNotifications)

router.get("/unreadNotifications", GetUnreadNotifications)

module.exports = router;
