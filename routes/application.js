const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { order, rowsPerPage, column, page } = req.body;

    const query = {
      text:
        "SELECT * " +
        "FROM " +
        "(SELECT sum(case when nodes.* is null then 0 else 1 end) as num_of_devices, applications.*  FROM applications " +
        "LEFT JOIN nodes ON nodes.application_id = applications.id " +
        "GROUP BY applications.id) as table1 " +
        "INNER JOIN " +
        "(SELECT sum(case when downlink_messages.* is null then 0 else 1 end) as num_of_downlink_messages, applications.id as id FROM applications " +
        "LEFT JOIN downlink_messages ON downlink_messages.application_id = applications.id " +
        "GROUP BY applications.id) as table3 " +
        "USING(id) " +
        "INNER JOIN " +
        "(SELECT sum(case when uplink_messages.* is null then 0 else 1 end) as num_of_uplink_messages, applications.id as id FROM applications " +
        "LEFT JOIN uplink_messages ON uplink_messages.application_id = applications.id " +
        "GROUP BY applications.id) as table2 " +
        "USING(id) " +
        `ORDER BY ${column} ${order.toUpperCase()}, id ${order.toUpperCase()} ` +
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
      text: "SELECT COUNT(*) FROM applications",
    };

    let { rows } = await db.query(query.text);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post("/detail", auth, async (req, res) => {
  try {
    const query = {
      text:
        "SELECT name, description, created, id FROM applications " +
        "WHERE applications.id = $1",
      values: [req.body.applicationId],
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
    const { order, rowsPerPage, column, page, applicationId } = req.body;

    const select =
      "uplink_messages.*, aps.name as gateway_name, " +
      "message_types.name as message_type_name, " +
      "nodes.name as node_name, " +
      "applications.name as application_name ";

    const query = {
      text:
        `SELECT ${select} FROM uplink_messages ` +
        "LEFT JOIN aps ON aps.id = uplink_messages.ap_id " +
        "LEFT JOIN message_types ON message_types.id = uplink_messages.message_type_id " +
        "LEFT JOIN nodes ON nodes.id = uplink_messages.node_id " +
        "INNER JOIN applications ON applications.id = uplink_messages.application_id " +
        `WHERE uplink_messages.application_id = '${applicationId}' ` +
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

router.post("/uplinkMessages/count", auth, async (req, res) => {
  try {
    const { applicationId } = req.body;

    const query = {
      text:
        `SELECT COUNT(*) FROM uplink_messages ` +
        "INNER JOIN applications ON applications.id = uplink_messages.application_id " +
        `WHERE uplink_messages.application_id = '${applicationId}' `,
    };

    let { rows } = await db.query(query.text);
    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/downlinkMessages/count", auth, async (req, res) => {
  try {
    const { applicationId, sent } = req.body;

    const query = {
      text:
        `SELECT COUNT(*) FROM downlink_messages ` +
        "INNER JOIN applications ON applications.id = downlink_messages.application_id " +
        `WHERE downlink_messages.application_id = '${applicationId}' and downlink_messages.sent = ${sent}`,
    };

    let { rows } = await db.query(query.text);
    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/downlinkMessages", auth, async (req, res) => {
  const { order, rowsPerPage, column, page, sent, applicationId } = req.body;

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
        "INNER JOIN applications ON applications.id = downlink_messages.application_id " +
        `WHERE downlink_messages.sent = ${sent} AND downlink_messages.application_id = '${applicationId}' ` +
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

router.post("/devices", auth, async (req, res) => {
  try {
    const { order, rowsPerPage, column, page, applicationId } = req.body;

    const select =
      "nodes.id, nodes.name, nodes.firmware, applications.name as application_name, " +
      "nodes.duty_cycle_refresh, nodes.dev_id";

    const query = {
      text:
        `SELECT ${select} FROM nodes ` +
        `INNER JOIN applications ON applications.id = nodes.application_id ` +
        `WHERE applications.id = ${applicationId} ` +
        `ORDER BY ${column} ${order.toUpperCase()}, dev_id ${order.toUpperCase()} ` +
        `LIMIT ${rowsPerPage} OFFSET ${rowsPerPage * page - rowsPerPage}`,
    };

    let { rows } = await db.query(query.text);

    // TODO compute this for real
    rows = rows.map((row) => {
      return {
        ...row,
        pdr: "66",
      };
    });

    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/devicesCount", auth, async (req, res) => {
  try {
    const query = {
      text:
        "SELECT COUNT(*) FROM nodes " +
        "INNER JOIN applications ON applications.id = nodes.application_id " +
        `WHERE applications.id = ${req.body.applicationId}`,
    };

    let { rows } = await db.query(query.text);
    res.json(rows[0]);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post("/rename", auth, async (req, res) => {
  console.log("som tu");
  try {
    const query = {
      text:
        "UPDATE applications " +
        `SET name='${req.body.newApplicationName}' ` +
        `WHERE applications.id = ${req.body.applicationId}`,
    };

    let { rows } = await db.query(query.text);
    res.json(rows[0]);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
