const express = require('express');
const { test } = require('../controllers/auth.controllers');
const router = express.Router();

router.post("/test", test);

module.exports = router;