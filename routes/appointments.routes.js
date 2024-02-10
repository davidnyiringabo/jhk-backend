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
  deleteAppointmentById,
} = require("../controllers/appointments.controllers");
const router = express.Router();

router.get("/getAll", getAllAppointments);
router.post("/create", [authMiddleWare], createAppointment);
router.post("/delete", [authMiddleWare], deleteAppointmentById);
router.put("/updateStatus", [authMiddleWare], updateFeeStatus);
router.post("/requestFee", [authMiddleWare], sendResetCode);

module.exports = router;
