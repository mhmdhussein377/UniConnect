const express = require("express");
const router = express.Router();
const {SendFriendRequest} = require('./../controllers/FriendshipController')

router.post("/send-friend-request/:recipientUserId", SendFriendRequest)

module.exports = router;
