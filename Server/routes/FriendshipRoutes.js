const express = require("express");
const router = express.Router();
const {SendFriendRequest, AcceptFriendRequest, RejectFriendRequest, CancelFriendRequest, Unfriend, GetFriendship} = require('./../controllers/FriendshipController')

router.get("/:username", GetFriendship)

router.post("/send-friend-request/:recipientUserId", SendFriendRequest)

router.post("/accept-friend-request/:recipientUserId", AcceptFriendRequest)

router.post("/cancel-friend-request/:recipientUserId", CancelFriendRequest)

router.post("/unfriend/:friendUserId", Unfriend)

router.post("/reject-friend-request/:recipientUserId", RejectFriendRequest)

module.exports = router;
