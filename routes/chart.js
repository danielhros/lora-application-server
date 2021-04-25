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

    const uplinkMessagesRes = rows;

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
    const downlinkMessages = result.rows;

    data.downlink = downlinkMessages.map((u) => {
      return {
        time: u.formatted_ts,
        count: u.count_of_messages,
      };
    });

    const response = [];
    for (let i = 0; i < 5; i++) {
      response.push({
        name: moment(data.uplink[i].time).format("HH:mm"),
        uplink: data.uplink[i].count,
        downlink: data.downlink[i].count,
      });
    }

    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/application", auth, async (req, res) => {
  const { applicationId } = req.body;

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
        "FROM uplink_messages " +
        `WHERE application_id = ${applicationId} ` +
        ") t2 " +
        "ON (t1.formatted_ts = t2.actual_ts) " +
        "GROUP BY t1.formatted_ts " +
        "ORDER BY t1.formatted_ts DESC " +
        "LIMIT 5",
    };

    let { rows } = await db.query(query.text);

    const uplinkMessagesRes = rows;

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
      "FROM downlink_messages " +
      `WHERE application_id = ${applicationId} ` +
      ") t2 " +
      "ON (t1.formatted_ts = t2.actual_ts) " +
      "GROUP BY t1.formatted_ts " +
      "ORDER BY t1.formatted_ts DESC " +
      "LIMIT 5";

    const result = await db.query(query.text);
    const downlinkMessages = result.rows;

    data.downlink = downlinkMessages.map((u) => {
      return {
        time: u.formatted_ts,
        count: u.count_of_messages,
      };
    });

    const response = [];
    for (let i = 0; i < 5; i++) {
      response.push({
        name: moment(data.uplink[i].time).format("HH:mm"),
        uplink: data.uplink[i].count,
        downlink: data.downlink[i].count,
      });
    }

    res.json(response);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/device", auth, async (req, res) => {
  const { deviceId } = req.body;

  const data = {
    uplink: [],
    downlink: [],
  };

  try {
    let query = {
      text:
        "SELECT date_trunc('hour', ts) AS formatted_ts " +
        "FROM generate_series('2021-02-26 22:00:00'::timestamp, '2021-02-27 03:00:00', interval '1 hour') as ts " +
        "ORDER BY formatted_ts DESC " +
        "LIMIT 5",
    };

    const { rows } = await db.query(query.text);

    const times = rows.map((time) => {
      return time.formatted_ts;
    });

    let data = [];

    for (time of times) {
      const formattedTime = moment(time).format("YYYY-MM-DD HH:mm:ss.SSS");

      query.text =
        "SELECT seq, receive_time " +
        "FROM uplink_messages " +
        `WHERE node_id = '${deviceId}' AND date_trunc('hour', receive_time) = '${formattedTime}' ` +
        "ORDER BY receive_time ASC";

      const { rows: uplinkMessages } = await db.query(query.text);

      query.text =
        "SELECT count(*) " +
        "FROM downlink_messages " +
        `WHERE node_id = '${deviceId}' AND date_trunc('hour', send_time) = '${formattedTime}' `;

      const {
        rows: [downlinkMessagesCount],
      } = await db.query(query.text);

      let collisions = 0;

      for (let i = 0; i + 1 < uplinkMessages.length; i++) {
        const first = uplinkMessages[i].seq;
        const next = uplinkMessages[i + 1].seq;

        if (next - first <= 0) {
          const seqCountAverage = Math.abs(next - first);

          const beforeResetTimestamp = moment(
            uplinkMessages[i].receive_time
          ).valueOf();
          const afterResetTimestamp = moment(
            uplinkMessages[i + 1].receive_time
          ).valueOf();

          const diff = Math.abs(afterResetTimestamp - beforeResetTimestamp);
          const messageFrequency = Math.floor(diff / seqCountAverage);

          const firstTimestamp = moment(
            uplinkMessages[0].receive_time
          ).valueOf();
          const lastTimestamp = moment(
            uplinkMessages[uplinkMessages.length - 1].receive_time
          ).valueOf();

          const totalDiff = Math.abs(lastTimestamp - firstTimestamp);
          collisions = Math.floor(totalDiff / messageFrequency);
          break;
        }
        collisions += next - first;
      }

      data.push({
        name: moment(time).format("HH:mm"),
        uplink: uplinkMessages.length,
        downlink: downlinkMessagesCount.count,
        collisions: collisions,
      });
    }

    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.post("/deviceMessageRatio", auth, async (req, res) => {
  const { deviceId } = req.body;

  try {
    let query = {
      text:
        "SELECT nc.normal, ec.emer, rc.reg FROM " +
        `(SELECT COUNT(*) as normal FROM uplink_messages WHERE message_type_id=1 and node_id='${deviceId}') as nc, ` +
        `(SELECT COUNT(*) as emer FROM uplink_messages WHERE message_type_id=2 and node_id='${deviceId}') as ec, ` +
        `(SELECT COUNT(*) as reg FROM uplink_messages WHERE message_type_id=3 and node_id='${deviceId}') as rc`,
    };

    let { rows } = await db.query(query.text);

    const normal = parseInt(rows[0].normal);
    const emer = parseInt(rows[0].emer);
    const reg = parseInt(rows[0].reg);
    const total = normal + emer + reg;

    const normalPer = (normal * 100) / total || 0;
    const emerPer = (emer * 100) / total || 0;
    const req = (reg * 100) / total || 0;

    res.json({
      normal: Math.round(normalPer * 100) / 100,
      emer: Math.round(emerPer * 100) / 100,
      reg: Math.round(req * 100) / 100,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
