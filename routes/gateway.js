const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { order, rowsPerPage, column, page } = req.body;

    const select =
      "id, protocol_ver, max_power, duty_cycle_refresh, lora_protocol_ver";

    const query = {
      name: "get gateways",
      text:
        `SELECT ${select} ` +
        "FROM aps " +
        `ORDER BY ${column} ${order.toUpperCase()}, dev_id ${order.toUpperCase()} ` +
        `LIMIT ${rowsPerPage} OFFSET ${rowsPerPage * page - rowsPerPage}`,
    };

    console.log(query.text);

    let { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const query = {
      name: "get gateways",
      text: "SELECT COUNT(*) FROM aps",
    };

    let { rows } = await db.query(query);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
