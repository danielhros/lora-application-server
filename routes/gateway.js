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

// SELECT uplink_messages.*, aps.name as gateway_name, aps.id FROM uplink_messages
// INNER JOIN aps ON aps.id = uplink_messages.ap_id
// WHERE uplink_messages.ap_id = '111111'
// LIMIT 5 OFFSET 0

router.post("/uplinkMessages", auth, async (req, res) => {
  try {
    const { order, rowsPerPage, column, page, gatewayId } = req.body;

    const query = {
      text:
        `SELECT uplink_messages.*, aps.name as gateway_name FROM uplink_messages ` +
        "INNER JOIN aps ON aps.id = uplink_messages.ap_id " +
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
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
