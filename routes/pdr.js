const express = require("express");
const router = express.Router();
const db = require("../db");
const auth = require("../middleware/auth");

router.get("/allMessages", auth, async (req, res) => {
  try {
    const query = {
      text:
        "SELECT t.seq FROM " +
        "(SELECT * FROM uplink_messages " +
        "ORDER BY receive_time DESC " +
        "LIMIT 100 offset 0) t " +
        "ORDER BY t.receive_time ASC ",
    };

    let { rows: seqs } = await db.query(query.text);

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

    res.json({
      pdr: median === 0 || median ? median : 100,
    });
  } catch (err) {
    res.status(500).send("Server error");
  }
});

module.exports = router;
