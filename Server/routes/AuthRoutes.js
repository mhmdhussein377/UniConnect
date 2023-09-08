const express = require("express");
const router = express.Router();
const { Register, Login, GoogleLogin } = require("./../controllers/AuthController");

router.post("/login", Login);

router.post("/register", Register);

router.post("/register/google", GoogleLogin);

module.exports = router;