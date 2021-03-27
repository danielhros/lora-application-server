const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    let { rows } = await db.query("SELECT * FROM aps LIMIT 10");

    res.json(rows);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
