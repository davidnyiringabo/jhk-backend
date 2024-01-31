const express = require("express");
const { updateUser } = require("../controllers/user.controllers");
const router = express.Router();
const authMiddleWare = require("../middlewares/auth"); // Updated import

router.post("/updateUser", [authMiddleWare], updateUser);

module.exports = router;
