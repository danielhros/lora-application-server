const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.post("/uplink", auth, async (req, res) => {
  const { order, rowsPerPage, column, page } = req.body;

  try {
    const query = {
      text:
        `SELECT uplink_messages.*, aps.name as gateway_name FROM uplink_messages ` +
        "INNER JOIN aps ON aps.id = uplink_messages.ap_id " +
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

router.post("/downlink", auth, async (req, res) => {
  const { order, rowsPerPage, column, page, sent } = req.body;
  try {
    const query = {
      text:
        `SELECT downlink_messages.*, aps.name as gateway_name FROM downlink_messages ` +
        "INNER JOIN aps ON aps.id = downlink_messages.ap_id " +
        `WHERE downlink_messages.sent = ${sent} ` +
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

router.get("/uplink", auth, async (req, res) => {
  try {
    const query = {
      name: "get count of uplink messages",
      text:
        "SELECT COUNT(*) FROM uplink_messages INNER JOIN aps ON aps.id = uplink_messages.ap_id",
    };

    let { rows } = await db.query(query.text);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get("/downlink/sent", auth, async (req, res) => {
  try {
    const query = {
      name: "get count of sent downlink messages",
      text:
        "SELECT COUNT(*) FROM downlink_messages INNER JOIN aps ON aps.id = downlink_messages.ap_id WHERE downlink_messages.sent = true",
    };

    let { rows } = await db.query(query.text);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get("/downlink/scheduled", auth, async (req, res) => {
  try {
    const query = {
      name: "get count of scheduled downlink messages",
      text:
        "SELECT COUNT(*) FROM downlink_messages INNER JOIN aps ON aps.id = downlink_messages.ap_id WHERE downlink_messages.sent = false",
    };

    let { rows } = await db.query(query.text);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
