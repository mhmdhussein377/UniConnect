const express = require("express");
const router = express.Router();
const { CreatePrivateMessage, CreatePrivateConversation, ReadPrivateMessage, GetPrivateConversationsDetails, GetPrivateConversationMessages } = require("../controllers/PrivateChatController");

router.post("/newPrivateMessage", CreatePrivateMessage);

router.post("/readPrivateMessage", ReadPrivateMessage);

router.post("/newPrivateConversation", CreatePrivateConversation);

router.post("/privateConversationMessages", GetPrivateConversationMessages);

router.get("/privateConversationsDetails", GetPrivateConversationsDetails);

module.exports = router;
