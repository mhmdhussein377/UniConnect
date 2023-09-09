const express = require("express");
const router = express.Router();
const { EditProfile, UserData, SearchUsers, SearchUsersCommunities, GetFriends } = require("../controllers/UserController");

// done
router.post("/edit-profile", EditProfile);

// needs to be completed
router.get("/friends", GetFriends)

// done
router.get("/:id", UserData)

// done
router.get("/search/:searchTerm", SearchUsersCommunities)

// i only have to exclude the owner
router.get("/search/:searchTerm/:communityId", SearchUsers)

module.exports = router;