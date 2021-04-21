const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");
const moment = require("moment");

// SELECT nodes.*, applications.name as application_name FROM nodes
// INNER JOIN applications ON applications.id = nodes.application_id
// ORDER BY name DESC, dev_id DESC
// LIMIT 5 OFFSET 0
router.post("/", auth, async (req, res) => {
  try {
    const { order, rowsPerPage, column, page } = req.body;

    const select =
      "nodes.id, nodes.name, nodes.firmware, applications.name as application_name, " +
      "nodes.duty_cycle_refresh, nodes.dev_id, nodes.upstream_power, nodes.downstream_power, nodes.pdr";

    const query = {
      text:
        `SELECT ${select} FROM nodes ` +
        `LEFT JOIN applications ON applications.id = nodes.application_id ` +
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
      name: "get nodes",
      text: "SELECT COUNT(*) FROM nodes",
    };

    let { rows } = await db.query(query.text);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post("/detail", auth, async (req, res) => {
  const select =
    "nodes.*, applications.name as application_name, transmission_params.registration_freq, " +
    "transmission_params.emergency_freq, transmission_params.standard_freq, " +
    "transmission_params.coderate, transmission_params.bandwidth";

  try {
    const query = {
      text:
        `SELECT ${select} FROM nodes ` +
        "LEFT JOIN applications ON applications.id = nodes.application_id " +
        "LEFT JOIN transmission_params on transmission_params.id = nodes.transmission_param_id " +
        "WHERE nodes.dev_id = $1",
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
    const { order, rowsPerPage, column, page, deviceId } = req.body;

    const select =
      "uplink_messages.*, aps.name as gateway_name, " +
      "message_types.name as message_type_name, " +
      "nodes.name as node_name, " +
      "applications.name as application_name ";

    const query = {
      text:
        `SELECT ${select} FROM uplink_messages ` +
        "LEFT JOIN aps ON aps.id = uplink_messages.ap_id " +
        "INNER JOIN nodes ON nodes.id = uplink_messages.node_id " +
        "LEFT JOIN message_types ON message_types.id = uplink_messages.message_type_id " +
        "LEFT JOIN applications ON applications.id = uplink_messages.application_id " +
        `WHERE nodes.id = '${deviceId}' ` +
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
// INNER JOIN nodes ON nodes.id = uplink_messages.node_id
// WHERE nodes.id = 'xb15'
router.post("/uplinkMessages/count", auth, async (req, res) => {
  try {
    const { deviceId } = req.body;

    const query = {
      text:
        `SELECT COUNT(*) FROM uplink_messages ` +
        "LEFT JOIN aps ON aps.id = uplink_messages.ap_id " +
        "INNER JOIN nodes ON nodes.id = uplink_messages.node_id " +
        `WHERE nodes.id = '${deviceId}' `,
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
// INNER JOIN nodes ON nodes.id = downlink_messages.node_id
// WHERE nodes.id = 'xb15' and downlink_messages.sent = true
router.post("/downlinkMessages/count", auth, async (req, res) => {
  try {
    const { deviceId, sent } = req.body;

    const query = {
      text:
        `SELECT COUNT(*) FROM downlink_messages ` +
        "LEFT JOIN aps ON aps.id = downlink_messages.ap_id " +
        "INNER JOIN nodes ON nodes.id = downlink_messages.node_id " +
        `WHERE nodes.id = '${deviceId}' and downlink_messages.sent = ${sent}`,
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
// INNER JOIN nodes ON nodes.id = downlink_messages.node_id
// WHERE downlink_messages.sent = false AND nodes.id = 'xb15'
// ORDER BY sent DESC, dev_id DESC
// LIMIT 5 OFFSET 0
router.post("/downlinkMessages", auth, async (req, res) => {
  const { order, rowsPerPage, column, page, sent, deviceId } = req.body;

  const select =
    "downlink_messages.*, aps.name as gateway_name, " +
    "nodes.name as node_name, " +
    "applications.name as application_name ";

  try {
    const query = {
      text:
        `SELECT ${select} FROM downlink_messages ` +
        "LEFT JOIN aps ON aps.id = downlink_messages.ap_id " +
        "INNER JOIN nodes ON nodes.id = downlink_messages.node_id " +
        "LEFT JOIN applications ON applications.id = downlink_messages.application_id " +
        `WHERE downlink_messages.sent = ${sent} AND nodes.id = '${deviceId}' ` +
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

router.post("/config", auth, async (req, res) => {
  const {
    deviceId,
    newDeviceName,
    newSpreadingFactor,
    newTransmissionPower,
  } = req.body;

  try {
    const query = {
      text:
        `UPDATE nodes ` +
        `SET name='${newDeviceName}' ` +
        `WHERE id='${deviceId}'`,
    };

    await db.query(query.text);
    res.status(200).send("OK");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/top", auth, async (req, res) => {
  const { deviceId } = req.body;

  try {
    const query = {
      text:
        `SELECT spf.spf, frequency.frequency, message_type.name as message_type FROM ` +
        `(SELECT spf FROM uplink_messages WHERE node_id = '${deviceId}' GROUP BY spf ORDER BY COUNT(spf) DESC LIMIT 1) as spf, ` +
        `(SELECT frequency FROM uplink_messages WHERE node_id = '${deviceId}' GROUP BY frequency ORDER BY COUNT(frequency) DESC LIMIT 1) as frequency, ` +
        `(SELECT message_types.name FROM message_types WHERE message_types.id IN (SELECT uplink_messages.message_type_id FROM uplink_messages WHERE node_id = '${deviceId}' GROUP BY message_type_id ORDER BY COUNT(message_type_id) DESC LIMIT 1)) as message_type `,
    };

    let { rows } = await db.query(query.text);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/settings", auth, async (req, res) => {
  const { deviceId } = req.body;

  const netData = JSON.stringify(req.body.netData);

  try {
    let query = {
      text:
        `SELECT uplink_messages.* FROM uplink_messages ` +
        "INNER JOIN nodes ON nodes.id = uplink_messages.node_id " +
        `WHERE nodes.id = '${deviceId}' ` +
        `ORDER BY receive_time DESC, dev_id DESC ` +
        `LIMIT 1`,
    };

    let { rows } = await db.query(query.text);
    const um = rows[0];

    const now = moment().format("YYYY-MM-DD HH:mm:ss.SSS");

    query.text =
      "INSERT INTO downlink_messages (app_data, net_data, duty_cycle_remaining, sent, ack_required, delivered, send_time, frequency, spf, power, airtime , coderate, bandwidth, ap_id, node_id, application_id) " +
      `VALUES ('', '${[netData]}'::json, ${
        um?.duty_cycle_remaining || 36000
      }, false, ` +
      `true, false, '${now}', ${um?.frequency || 866900000}, ${
        um?.spf || 12
      }, ${um?.power || 15}, ${um?.airtime || 901}, '${
        um?.coderate || "4/5"
      }', ` +
      `${um?.bandwidth || 125000}, '${um?.ap_id || 111111}', '${deviceId}', '${
        um?.application_id || 1
      }');`;

    await db.query(query.text);
    res.status(200).send("OK");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
