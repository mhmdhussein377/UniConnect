const express = require("express");
const router = express.Router();
const {
    GetCommunity,
    CreateCommunity,
    DeleteCommunity,
    UpdateCommunity,
    AddMembers,
    SendCommunityJoinRequest,
    RemoveMembers,
    SendCommunityInviteRequest,
    AcceptCommunityJoinRequest,
    AcceptCommunityInviteRequest,
    LeaveCommunity,
    CancelCommunityJoinRequest,
    CancelCommunityInviteRequest
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

router.post("/leave/:communityId", LeaveCommunity)



router.post('/send-community-join-request/:communityId', SendCommunityJoinRequest)

router.post("/cancel-community-join-request/:communityId", CancelCommunityJoinRequest);

router.post("/accept-community-join-request/:communityId/:requesterUserId", AcceptCommunityJoinRequest)

// done
router.post("/send-community-invite-request/:communityId/:recipientUserId", SendCommunityInviteRequest);

// done
router.post("/cancel-community-invite-request/:communityId/:recipientUserId", CancelCommunityInviteRequest)

router.post("/accept-community-invite-request/:communityId/:requesterUserId", AcceptCommunityInviteRequest);

module.exports = router;
