const express = require("express");
const authMiddleWare = require("../middlewares/auth");
const {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  getDoctorById,
} = require("../controllers/doctors.controllers");
const router = express.Router();

router.get("/getAll", getAllDoctors);
router.get("/getById", getDoctorById);
router.post("/create", [authMiddleWare], createDoctor);
router.put("/update", [authMiddleWare], updateDoctor);

module.exports = router;
