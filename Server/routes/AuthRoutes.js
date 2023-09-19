const express = require("express");
const router = express.Router();
const { Register, Login, GoogleLogin, ForgotPassword, ResetPassword, Logout } = require("./../controllers/AuthController");

router.post("/login", Login);

router.post("/register", Register);

router.post("/register/google", GoogleLogin);

router.post("/forgot-password", ForgotPassword);

router.post("/reset-password/:userId/:token", ResetPassword);

router.post("/logout", Logout)

module.exports = router;