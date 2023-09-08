const express = require("express");
const router = express.Router();
const {CreatePrivateConversation} = require("../controllers/PrivateChatController")

// create a new private conversation
router.post('/newPrivateConversation', CreatePrivateConversation)

module.exports = router;