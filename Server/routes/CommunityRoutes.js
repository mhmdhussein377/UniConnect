const express = require("express");
const router = express.Router();
const {GetCommunity, CreateCommunity, DeleteCommunity, UpdateCommunity, AddMembers} = require("./../controllers/CommunityController");

router.get("/:communityId", GetCommunity)

router.post("/create", CreateCommunity);

router.post("/delete/:communityId", DeleteCommunity);

router.post("update/:communityId", UpdateCommunity);

router.post("/:communityId/add-members", AddMembers);

module.exports = router;