const express = require("express");
const router = express.Router();
const {CreatePrivateConversation, CreatePrivateMessage} = require("../controllers/PrivateChatController")

// create a new private conversation
router.post('/newPrivateConversation', CreatePrivateConversation)

// create a new private message
router.post("/newPrivateMessage", CreatePrivateMessage)

module.exports = router;