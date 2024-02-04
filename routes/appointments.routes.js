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

router.get("/getAll", login);
router.post("/create", login);
router.put("/updateStatus", register);
router.post("/requestFee", sendResetCode);
router.delete("/delete", verifyCode);

module.exports = router;
