const express = require("express");
const router = express.Router();
const { EditProfile, UserData, SearchUsers, SearchUsersCommunities, GetFriends, GetSuggestedUsers } = require("../controllers/UserController");

// done
router.post("/edit-profile", EditProfile);

// get all the user's friends who are not memebrs in a community
// done
router.get("/friends/:communityId", GetFriends)

// done
router.get("/:username", UserData)

// done
router.get("/search/:searchTerm", SearchUsersCommunities)

// done
router.get("/search/:searchTerm/:communityId", SearchUsers)

router.post("/suggested-users", GetSuggestedUsers)

module.exports = router;