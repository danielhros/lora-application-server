const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");
const { allMessages, messageDetail, messagesChart } = require("../controllers/messagesController");

// SELECT uplink_messages.*, aps.name as gateway_name, message_types.name as message_type, nodes.name as node_name, applications.name as application_name
// FROM uplink_messages
// INNER JOIN aps ON aps.id = uplink_messages.ap_id
// LEFT JOIN message_types ON message_types.id = uplink_messages.message_type_id
// LEFT JOIN nodes ON nodes.id = uplink_messages.node_id
// LEFT JOIN applications ON applications.id = uplink_messages.application_id
// ORDER BY id DESC, dev_id DESC
// LIMIT 5 OFFSET 0
router.post("/uplink", auth, async (req, res) => {
  const { order, rowsPerPage, column, page } = req.body;

  const select =
    "uplink_messages.*, aps.name as gateway_name, " +
    "message_types.name as message_type_name, " +
    "nodes.name as node_name, " +
    "applications.name as application_name ";

  try {
    const query = {
      text:
        `SELECT ${select} FROM uplink_messages ` +
        "LEFT JOIN aps ON aps.id = uplink_messages.ap_id " +
        "LEFT JOIN message_types ON message_types.id = uplink_messages.message_type_id " +
        "LEFT JOIN nodes ON nodes.id = uplink_messages.node_id " +
        "LEFT JOIN applications ON applications.id = uplink_messages.application_id " +
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

  const select =
    "downlink_messages.*, aps.name as gateway_name, " +
    "nodes.name as node_name, " +
    "applications.name as application_name ";

  try {
    const query = {
      text:
        `SELECT ${select} FROM downlink_messages ` +
        "LEFT JOIN aps ON aps.id = downlink_messages.ap_id " +
        "LEFT JOIN nodes ON nodes.id = downlink_messages.node_id " +
        "LEFT JOIN applications ON applications.id = downlink_messages.application_id " +
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
      text: "SELECT COUNT(*) FROM uplink_messages ",
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
        "SELECT COUNT(*) FROM downlink_messages WHERE downlink_messages.sent = true",
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
        "SELECT COUNT(*) FROM downlink_messages WHERE downlink_messages.sent = false",
    };

    let { rows } = await db.query(query.text);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get('/chart-data', auth, messagesChart);

router.get('/all-messages', auth, allMessages);
router.get('/detail/:id/:type', auth, messageDetail);

module.exports = router;
