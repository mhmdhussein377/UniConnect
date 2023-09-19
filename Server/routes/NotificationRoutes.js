const express = require("express");
const router = express.Router();
const {UpdateNotificationStatus, AcceptCommunityJoinRequest, GetNotifications, GetUnreadNotifications} = require("./../controllers/NotificationController");

// app.post("/accepct-community-join-request", AcceptCommunityJoinRequest)

router.get("/", GetNotifications)

router.get("/", GetUnreadNotifications)

module.exports = router;
