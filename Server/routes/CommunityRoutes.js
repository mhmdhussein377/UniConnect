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
    CancelCommunityInviteRequest,
    AcceptCommunityJoinRequests,
    RejectCommunityJoinRequest,
    RejectCommunityInviteRequest
} = require("./../controllers/CommunityController");

router.get("/:communityId", GetCommunity)

router.post("/create", CreateCommunity);

router.post("/delete/:communityId", DeleteCommunity);

router.post("/update/:communityId", UpdateCommunity);

router.post("/:communityId/add-members", AddMembers);

router.post("/:communityId/remove-members", RemoveMembers);

router.post("/leave/:communityId", LeaveCommunity)

router.post('/send-community-join-request/:communityId', SendCommunityJoinRequest)

router.post("/cancel-community-join-request/:communityId", CancelCommunityJoinRequest);

router.post("/accept-community-join-request/:communityId/:requesterUserId", AcceptCommunityJoinRequest)

router.post("/reject-community-join-request/:communityId/:requestedUserId", RejectCommunityJoinRequest)

router.post("/accept-community-join-requests/:communityId", AcceptCommunityJoinRequests)

router.post("/send-community-invite-request/:communityId/:recipientUserId", SendCommunityInviteRequest);

router.post("/cancel-community-invite-request/:communityId/:recipientUserId", CancelCommunityInviteRequest)

router.post("/accept-community-invite-request/:communityId", AcceptCommunityInviteRequest);

router.post("/reject-community-invite-request/:communityId", RejectCommunityInviteRequest)

module.exports = router;
