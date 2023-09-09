const express = require("express");
const router = express.Router();
const {
    GetCommunity,
    CreateCommunity,
    DeleteCommunity,
    UpdateCommunity,
    AddMembers,
    SendCommunityJoinRequest,
    RemoveMembers
} = require("./../controllers/CommunityController");

// done
router.get("/:communityId", GetCommunity)

// done
router.post("/create", CreateCommunity);

// done
router.post("/delete/:communityId", DeleteCommunity);

// done
router.post("/update/:communityId", UpdateCommunity);

// done
router.post("/:communityId/add-members", AddMembers);

// done
router.post("/:communityId/remove-members", RemoveMembers);

// send community join request
router.post('/send-community-join-request/:communityId', SendCommunityJoinRequest)

module.exports = router;
