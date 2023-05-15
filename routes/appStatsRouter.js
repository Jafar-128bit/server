const express = require('express');
const router = express.Router();
const {monitorProcessStats} = require("../controllers/memoryStats");

router.get('/stats', monitorProcessStats);

module.exports = router;