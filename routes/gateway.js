const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { order, rowsPerPage, column, page } = req.body;

    const select =
      "id, protocol_ver, max_power, duty_cycle_refresh, lora_protocol_ver, name, firmware, dev_id";

    const query = {
      text:
        `SELECT ${select} ` +
        "FROM aps " +
        `ORDER BY ${column} ${order.toUpperCase()}, dev_id ${order.toUpperCase()} ` +
        `LIMIT ${rowsPerPage} OFFSET ${rowsPerPage * page - rowsPerPage}`,
    };

    let { rows } = await db.query(query.text);
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

    let { rows } = await db.query(query.text);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post("/create", auth, async (req, res) => {
  try {
    // TODO: create record of gateway
    res.statusCode(200);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post("/detail", auth, async (req, res) => {
  try {
    const query = {
      text: "SElECT * FROM aps WHERE dev_id = $1",
      values: [req.body.devId],
    };
    let { rows } = await db.query(query.text, query.values);
    res.json(rows);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
