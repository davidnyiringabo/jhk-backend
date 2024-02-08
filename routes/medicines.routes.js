const express = require("express");
const authMiddleWare = require("../middlewares/auth");
const {
  getAllDoctors,
  createDoctor,
  updateDoctor,
  getDoctorById,
} = require("../controllers/doctors.controllers");
const {
  createMedicine,
  updateMedicine,
  getAllMedicines,
  getMedicineById,
  deleteMedicine,
} = require("../controllers/medicines.controllers");
const router = express.Router();

router.get("/getAll", getAllMedicines);
router.get("/getById", getMedicineById);
router.post("/create", [authMiddleWare], createMedicine);
router.put("/update", [authMiddleWare], updateMedicine);
router.delete("/delete", [authMiddleWare], deleteMedicine);

module.exports = router;
