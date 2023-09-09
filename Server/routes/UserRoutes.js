const express = require("express");
const router = express.Router();
const { EditProfile, UserData, SearchUsers, SearchUsersCommunities } = require("../controllers/UserController");

router.post("/edit-profile", EditProfile);

// needs testing
router.get("/:id", UserData)

// needs testing
router.get("/:searchTerm/:communityId", SearchUsers)

// needs testing
router.get("/:searchTerm", SearchUsersCommunities)

module.exports = router;