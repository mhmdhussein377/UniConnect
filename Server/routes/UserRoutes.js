const express = require("express");
const router = express.Router();
const { EditProfile } = require("../controllers/UserController");

router.post("/edit-profile", EditProfile);

module.exports = router;