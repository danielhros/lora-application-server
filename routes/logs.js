const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const { dashboardLog } = require("../controllers/logsController");

router.get('/', auth, dashboardLog);

module.exports = router;