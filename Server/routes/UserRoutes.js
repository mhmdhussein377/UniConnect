const express = require("express");
const router = express.Router();
const { EditProfile, UserData, SearchUsers, SearchUsersCommunities, GetFriends, GetSuggestedUsers } = require("../controllers/UserController");

router.post("/suggested-users", GetSuggestedUsers);

router.post("/edit-profile", EditProfile);

router.get("/friends/:communityId", GetFriends)

router.get("/:username", UserData)

router.get("/search/:searchTerm", SearchUsersCommunities)

router.get("/search/:searchTerm/:communityId", SearchUsers)

module.exports = router;