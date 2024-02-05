const express = require("express");
const {
  login,
  register,
  sendResetCode,
  verifyCode,
  resetPassword,
} = require("../controllers/auth.controllers");
const authMiddleWare = require("../middlewares/auth");
const { getAllAppointments,createAppointment,updateFeeStatus } = require("../controllers/appointments.controllers");
const router = express.Router();

router.get("/getAll", getAllAppointments);
router.post("/create", createAppointment);
router.put("/updateStatus", updateFeeStatus);
router.post("/requestFee", sendResetCode);
router.delete("/delete", verifyCode);

module.exports = router;
