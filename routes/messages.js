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

module.exports = router;
