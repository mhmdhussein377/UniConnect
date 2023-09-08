const express = require("express");
const router = express.Router();
const {GetCommunity} = require("./../controllers/CommunityController")

router.get("/:communityId", GetCommunity)

module.exports = router;