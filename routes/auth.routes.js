const express = require("express");
const {
  login,
  register,
  sendResetCode,
  verifyCode,
  resetPassword,
} = require("../controllers/auth.controllers");
const authMiddleWare = require("../middlewares/auth");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/send-verification", sendResetCode);
router.post("/verify-code", verifyCode);
router.post("/reset-password", [authMiddleWare] , resetPassword);

module.exports = router;
