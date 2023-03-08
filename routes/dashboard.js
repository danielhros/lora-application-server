const express = require("express");
const { messagesDashboard } = require("../controllers/messagesController");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.get("/top", auth, async (req, res) => {
  try {
    const query = {
      text:
        "SELECT spf.spf, frequency.frequency, message_type.name as message_type FROM" +
        "(SELECT spf FROM uplink_messages GROUP BY spf ORDER BY COUNT(spf) DESC LIMIT 1) as spf, " +
        "(SELECT frequency FROM uplink_messages GROUP BY frequency ORDER BY COUNT(frequency) DESC LIMIT 1) as frequency, " +
        "(SELECT message_types.name FROM message_types WHERE message_types.id IN (SELECT uplink_messages.message_type_id FROM uplink_messages GROUP BY message_type_id ORDER BY COUNT(message_type_id) DESC LIMIT 1)) as message_type",
    };

    let { rows } = await db.query(query.text);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.get("/map", auth, async (req, res) => {
  try {
    const query = {
      text:
        "SELECT name, dev_id AS id, lat, lng FROM aps ORDER BY aps.id LIMIT 3",
    };

    let { rows } = await db.query(query.text);
    res.json(rows);
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

router.get('/top-messages', auth, messagesDashboard);

module.exports = router;
