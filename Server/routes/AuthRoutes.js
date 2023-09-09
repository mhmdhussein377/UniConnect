const express = require("express");
const router = express.Router();
const { Register, Login, GoogleLogin, ForgotPassword, ResetPassword } = require("./../controllers/AuthController");

// done
router.post("/login", Login);

// done
router.post("/register", Register);

// done
router.post("/register/google", GoogleLogin);

router.post("/forgot-password", ForgotPassword);

router.post("/reset-password/:userId/:token", ResetPassword);

module.exports = router;