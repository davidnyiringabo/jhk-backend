const express = require("express");
const {
  login,
  register,
  sendResetCode,
  verifyCode,
  resetPassword,
} = require("../controllers/auth.controllers");
const authMiddleWare = require("../middlewares/auth");
const {
  getAllAppointments,
  createAppointment,
  updateFeeStatus,
} = require("../controllers/appointments.controllers");
const router = express.Router();

router.get("/getAll", getAllAppointments);
router.post("/create", [authMiddleWare], createAppointment);
router.put("/updateStatus", [authMiddleWare], updateFeeStatus);
router.post("/requestFee", [authMiddleWare], sendResetCode);

module.exports = router;
