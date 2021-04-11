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

// SELECT * FROM aps
// JOIN transmission_params ON aps.transmission_param_id = transmission_params.id
// WHERE aps.dev_id = 20
router.post("/detail", auth, async (req, res) => {
  try {
    const query = {
      text:
        "SELECT aps.*, transmission_params.registration_freq, transmission_params.emergency_freq, transmission_params.standard_freq, transmission_params.coderate, transmission_params.bandwidth  FROM aps " +
        "JOIN transmission_params ON aps.transmission_param_id = transmission_params.id " +
        "WHERE aps.dev_id = $1",
      values: [req.body.devId],
    };
    let { rows } = await db.query(query.text, query.values);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/uplinkMessages", auth, async (req, res) => {
  try {
    const { order, rowsPerPage, column, page, gatewayId } = req.body;

    const select =
      "uplink_messages.*, aps.name as gateway_name, " +
      "message_types.name as message_type_name, " +
      "nodes.name as node_name, " +
      "applications.name as application_name ";

    const query = {
      text:
        `SELECT ${select} FROM uplink_messages ` +
        "INNER JOIN aps ON aps.id = uplink_messages.ap_id " +
        "LEFT JOIN message_types ON message_types.id = uplink_messages.message_type_id " +
        "LEFT JOIN nodes ON nodes.id = uplink_messages.node_id " +
        "LEFT JOIN applications ON applications.id = uplink_messages.application_id " +
        `WHERE uplink_messages.ap_id = '${gatewayId}' ` +
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

// SELECT COUNT(*) FROM uplink_messages
// INNER JOIN aps ON aps.id = uplink_messages.ap_id
// WHERE uplink_messages.ap_id = '111111'
router.post("/uplinkMessages/count", auth, async (req, res) => {
  try {
    const { gatewayId } = req.body;

    const query = {
      text:
        `SELECT COUNT(*) FROM uplink_messages ` +
        "INNER JOIN aps ON aps.id = uplink_messages.ap_id " +
        `WHERE uplink_messages.ap_id = '${gatewayId}' `,
    };

    let { rows } = await db.query(query.text);
    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// SELECT COUNT(*) FROM downlink_messages
// INNER JOIN aps ON aps.id = downlink_messages.ap_id
// WHERE downlink_messages.ap_id = '111111' and downlink_messages.sent = true
router.post("/downlinkMessages/count", auth, async (req, res) => {
  try {
    const { gatewayId, sent } = req.body;

    const query = {
      text:
        `SELECT COUNT(*) FROM downlink_messages ` +
        "INNER JOIN aps ON aps.id = downlink_messages.ap_id " +
        `WHERE downlink_messages.ap_id = '${gatewayId}' and downlink_messages.sent = ${sent}`,
    };

    let { rows } = await db.query(query.text);
    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// SELECT downlink_messages.*, aps.name as gateway_name FROM downlink_messages
// INNER JOIN aps ON aps.id = downlink_messages.ap_id
// WHERE downlink_messages.sent = true AND downlink_messages.ap_id = '111111'
// ORDER BY sent DESC, dev_id DESC
// LIMIT 5 OFFSET 0
router.post("/downlinkMessages", auth, async (req, res) => {
  const { order, rowsPerPage, column, page, sent, gatewayId } = req.body;

  const select =
    "downlink_messages.*, aps.name as gateway_name, " +
    "nodes.name as node_name, " +
    "applications.name as application_name ";

  try {
    const query = {
      text:
        `SELECT ${select} FROM downlink_messages ` +
        "INNER JOIN aps ON aps.id = downlink_messages.ap_id " +
        "LEFT JOIN nodes ON nodes.id = downlink_messages.node_id " +
        "LEFT JOIN applications ON applications.id = downlink_messages.application_id " +
        `WHERE downlink_messages.sent = ${sent} AND downlink_messages.ap_id = '${gatewayId}' ` +
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

module.exports = router;
