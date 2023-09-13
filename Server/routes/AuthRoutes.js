const express = require("express");
const router = express.Router();
const { Register, Login, GoogleLogin, ForgotPassword, ResetPassword, Logout } = require("./../controllers/AuthController");

// done
router.post("/login", Login);

// done
router.post("/register", Register);

// done
router.post("/register/google", GoogleLogin);

// done
router.post("/forgot-password", ForgotPassword);

// done
router.post("/reset-password/:userId/:token", ResetPassword);

router.post("/logout", Logout)

module.exports = router;