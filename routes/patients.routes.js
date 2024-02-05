const express = require("express");
const authMiddleWare = require("../middlewares/auth");
const {
  getAllPatients,
  createPatient,
  updatePatient,
  getPatientById,
} = require("../controllers/patients.controllers");
const router = express.Router();

router.get("/getAll", getAllPatients);
router.get("/getById", getPatientById);
router.post("/create", [authMiddleWare], createPatient);
router.put("/update", [authMiddleWare], updatePatient);

module.exports = router;
