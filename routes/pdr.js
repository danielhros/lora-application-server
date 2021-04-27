const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

const calculatePdr = (seqs) => {
  const data = [];

  let numberOfMessages = 0;
  let seqPosition = 0;

  for (let i = 0; i + 1 < seqs.length; i++) {
    const first = seqs[i].seq;
    const next = seqs[i + 1].seq;

    if (next - first <= 0 || i + 1 == seqs.length - 1) {
      numberOfReceivedMessages = i - seqPosition;
      numberOfMessages = seqs[i].seq - seqs[seqPosition].seq;

      if (i + 1 == seqs.length - 1 && next - first >= 0) {
        numberOfReceivedMessages += 1;
        numberOfMessages = seqs[i + 1].seq - seqs[seqPosition].seq;
      }

      if (numberOfMessages != 0) {
        const pdr = Math.floor(
          (numberOfReceivedMessages * 100) / numberOfMessages
        );
        data.push(pdr);
      }
      seqPosition = i + 1;
    }
  }

  const len = data.length;
  const dataSort = data.sort((a, b) => a - b);
  const mid = Math.ceil(len / 2);

  let median =
    len % 2 == 0
      ? Math.floor((dataSort[mid] + dataSort[mid - 1]) / 2)
      : dataSort[mid - 1];

  return median ? median : 0;
};

router.get("/allMessages", auth, async (req, res) => {
  try {
    const query = {
      text: "SELECT id FROM applications ORDER BY id",
    };

    let { rows: ids } = await db.query(query.text);

    let applicationsPdrs = [];

    for (id of ids) {
      query.text =
        "SELECT t.seq FROM " +
        "(SELECT * FROM uplink_messages " +
        `WHERE application_id = ${id.id} ` +
        "ORDER BY receive_time DESC " +
        "LIMIT 100 offset 0) t " +
        "ORDER BY t.receive_time ASC ";

      let { rows: seqs } = await db.query(query.text);

      applicationsPdrs.push(calculatePdr(seqs));
    }

    applicationsPdrs = applicationsPdrs.filter((appPdr) => appPdr != 0);

    const sum = applicationsPdrs.reduce((a, b) => a + b, 0);
    const finalPdr = sum / applicationsPdrs.length || 0;

    res.json({
      pdr: finalPdr || 0,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post("/application", auth, async (req, res) => {
  const { applicationId } = req.body;

  try {
    const query = {
      text:
        "SELECT t.seq FROM " +
        "(SELECT * FROM uplink_messages " +
        `WHERE application_id = ${applicationId} ` +
        "ORDER BY receive_time DESC " +
        "LIMIT 100 offset 0) t " +
        "ORDER BY t.receive_time ASC ",
    };

    let { rows: seqs } = await db.query(query.text);

    res.json({
      pdr: calculatePdr(seqs),
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.post("/gateway", auth, async (req, res) => {
  const { gatewayId } = req.body;

  let responseData = [];

  try {
    for (let i = 7; i < 13; i++) {
      const query = {
        text:
          "SELECT * FROM " +
          "(SELECT * FROM uplink_messages " +
          `WHERE ap_id = '${gatewayId}' AND spf = ${i} ` +
          "ORDER BY receive_time DESC " +
          "LIMIT 100 offset 0) t " +
          "ORDER BY t.receive_time ASC ",
      };

      let { rows: seqs } = await db.query(query.text);

      responseData.push({
        pdr: calculatePdr(seqs),
        spf: i,
      });
    }

    res.json(responseData);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
