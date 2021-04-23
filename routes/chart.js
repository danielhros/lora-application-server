const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");
const moment = require("moment");

router.get("/allMessages", auth, async (req, res) => {
  const data = {
    uplink: [],
    downlink: [],
  };

  try {
    let query = {
      text:
        "SELECT t1.formatted_ts, sum(case when t2.actual_ts is null then 0 else 1 end) AS count_of_messages " +
        "FROM ( " +
        "SELECT date_trunc('hour', ts) AS formatted_ts " +
        "FROM generate_series('2021-02-26 22:00:00'::timestamp, '2021-02-27 03:00:00', interval '1 hour') as ts " +
        ") t1 " +
        "LEFT JOIN " +
        "(SELECT date_trunc('hour', receive_time) as actual_ts " +
        "FROM uplink_messages) t2 " +
        "ON (t1.formatted_ts = t2.actual_ts) " +
        "GROUP BY t1.formatted_ts " +
        "ORDER BY t1.formatted_ts DESC " +
        "LIMIT 5",
    };

    let { rows } = await db.query(query.text);

    const uplinkMessagesRes = rows || [];

    data.uplink = uplinkMessagesRes.map((u) => {
      return {
        time: u.formatted_ts,
        count: u.count_of_messages,
      };
    });

    query.text =
      "SELECT t1.formatted_ts, sum(case when t2.actual_ts is null then 0 else 1 end) AS count_of_messages " +
      "FROM ( " +
      "SELECT date_trunc('hour', ts) AS formatted_ts " +
      "FROM generate_series('2021-02-26 22:00:00'::timestamp, '2021-02-27 03:00:00', interval '1 hour') as ts " +
      ") t1 " +
      "LEFT JOIN " +
      "(SELECT date_trunc('hour', send_time) as actual_ts " +
      "FROM downlink_messages) t2 " +
      "ON (t1.formatted_ts = t2.actual_ts) " +
      "GROUP BY t1.formatted_ts " +
      "ORDER BY t1.formatted_ts DESC " +
      "LIMIT 5";

    const result = await db.query(query.text);
    const downlinkMessages = result.rows || [];

    data.downlink = downlinkMessages.map((u) => {
      return {
        time: u.formatted_ts,
        count: u.count_of_messages,
      };
    });

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
