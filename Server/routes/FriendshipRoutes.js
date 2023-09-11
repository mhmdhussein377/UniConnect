const express = require("express");
const router = express.Router();
const {SendFriendRequest, AcceptFriendRequest, RejectFriendRequest, CancelFriendRequest, Unfriend} = require('./../controllers/FriendshipController')

// done
router.post("/send-friend-request/:recipientUserId", SendFriendRequest)

// done
router.post("/accept-friend-request/:recipientUserId", AcceptFriendRequest)

// done
router.post("/reject-friend-request/:recipientUserId", RejectFriendRequest)

router.post("/cancel/friend-request/:recipientUserId", CancelFriendRequest)

router.post("/unfriend/:friendUserId", Unfriend)

module.exports = router;
