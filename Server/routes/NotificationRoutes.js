const express = require("express");
const router = express.Router();
const {UpdateNotificationStatus, AcceptCommunityJoinRequest} = require("./../controllers/NotificationController");



// app.post("/accepct-community-join-request", AcceptCommunityJoinRequest)

module.exports = router;
