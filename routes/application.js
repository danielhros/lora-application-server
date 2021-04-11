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

module.exports = router;
