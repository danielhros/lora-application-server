const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

// SELECT nodes.*, applications.name as application_name FROM nodes
// INNER JOIN applications ON applications.id = nodes.application_id
// ORDER BY name DESC, dev_id DESC
// LIMIT 5 OFFSET 0
router.post("/", auth, async (req, res) => {
  try {
    const { order, rowsPerPage, column, page } = req.body;

    const select =
      "nodes.id, nodes.name, nodes.firmware, applications.name as application_name, " +
      "nodes.duty_cycle_refresh, nodes.dev_id";

    const query = {
      text:
        `SELECT ${select} FROM nodes ` +
        `INNER JOIN applications ON applications.id = nodes.application_id ` +
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

module.exports = router;
