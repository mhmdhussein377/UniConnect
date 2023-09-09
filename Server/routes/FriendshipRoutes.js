const express = require("express");
const router = express.Router();
const {SendFriendRequest, AcceptFriendRequest, RejectFriendRequest} = require('./../controllers/FriendshipController')

router.post("/send-friend-request/:recipientUserId", SendFriendRequest)

router.post("accept-friend-request/:recipientUserId", AcceptFriendRequest)

router.post("reject-friend-request/:recipientUserId", RejectFriendRequest)

module.exports = router;
