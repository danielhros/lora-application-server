const db = require("./index");

const populateDatabase = async () => {
  // await addNamesToAps();
  // await adFirmwareToAps();
  // await addNamesToNodes();
  // await addFirmwareNodes();
  // await addPDRToNodes();
};

const addNamesToAps = async () => {
  const query = {
    text: "SELECT COUNT(*) FROM aps",
  };

  let { rows } = await db.query(query.text);

  for (let i = 1; i <= rows[0].count; i++) {
    await db.query(`UPDATE aps SET name = 'Gateway ${i}' where dev_id = ${i}`);
  }
};

const adFirmwareToAps = async () => {
  const query = {
    text: "SELECT COUNT(*) FROM aps",
  };

  let { rows } = await db.query(query.text);

  for (let i = 1; i <= rows[0].count; i++) {
    await db.query(`UPDATE aps SET firmware = '1.0.${i}' where dev_id = ${i}`);
  }
};

const addNamesToNodes = async () => {
  const query = {
    text: "SELECT COUNT(*) FROM nodes",
  };

  let { rows } = await db.query(query.text);

  for (let i = 1; i <= rows[0].count; i++) {
    await db.query(`UPDATE nodes SET name = 'Device ${i}' where dev_id = ${i}`);
  }
};

const addFirmwareNodes = async () => {
  const query = {
    text: "SELECT COUNT(*) FROM nodes",
  };

  let { rows } = await db.query(query.text);

  for (let i = 1; i <= rows[0].count; i++) {
    await db.query(
      `UPDATE nodes SET firmware = '1.0.${i}' where dev_id = ${i}`
    );
  }
};

// min and max included
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const addPDRToNodes = async () => {
  const query = {
    text: "SELECT COUNT(*) FROM nodes",
  };

  let { rows } = await db.query(query.text);

  for (let i = 1; i <= rows[0].count; i++) {
    await db.query(
      `UPDATE nodes SET pdr = ${randomIntFromInterval(
        30,
        100
      )} where dev_id = ${i}`
    );
  }
};

exports.populateDatabase = populateDatabase;
