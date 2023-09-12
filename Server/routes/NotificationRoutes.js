const express = require("express");
const router = express.Router();
const {UpdateNotificationStatus, AcceptCommunityJoinRequest, GetNotifications} = require("./../controllers/NotificationController");

// app.post("/accepct-community-join-request", AcceptCommunityJoinRequest)

router.get("/", GetNotifications)

module.exports = router;
