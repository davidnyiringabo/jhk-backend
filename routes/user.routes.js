const express = require("express");
const { updateUser,deleteUser,getUserById, getUserByEmail } = require("../controllers/user.controllers");
const router = express.Router();
const authMiddleWare = require("../middlewares/auth"); // Updated import

router.get("/getUserByEmail", [authMiddleWare], getUserByEmail);
router.get("/getUserById", [authMiddleWare], getUserById);
router.post("/updateUser", [authMiddleWare], updateUser);
router.delete("/deleteUser", [authMiddleWare], deleteUser);

module.exports = router;
