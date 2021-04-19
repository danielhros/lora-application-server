const db = require("./index");
const faker = require("faker");

const populateDatabase = async () => {
  // await addNamesToAps();
  // await adFirmwareToAps();
  // await addNamesToNodes();
  // await addFirmwareNodes();
  // await addPDRToNodes();
  // await setRandomDutyCycleRemainingDownlink();
  // await setRandomDutyCycleRemainingUplink();
  // await addGeoToNodes();
};

// min and max included
function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const addNamesToAps = async () => {
  const query = {
    text: "SELECT COUNT(*) FROM aps",
  };

  let { rows } = await db.query(query.text);

  for (let i = 1; i <= rows[0].count; i++) {
    await db.query(
      `UPDATE aps SET name = '${faker.commerce.productName()}' where dev_id = ${i}`
    );
    console.log(i);
  }
};

const adFirmwareToAps = async () => {
  const query = {
    text: "SELECT COUNT(*) FROM aps",
  };

  let { rows } = await db.query(query.text);

  for (let i = 1; i <= rows[0].count; i++) {
    await db.query(
      `UPDATE aps SET firmware = '${randomIntFromInterval(
        0,
        3
      )}.${randomIntFromInterval(0, 15)}.${randomIntFromInterval(
        1,
        20
      )}' where dev_id = ${i}`
    );
    console.log(i);
  }
};

const setRandomDutyCycleRemainingDownlink = async () => {
  const query = {
    text: "SELECT COUNT(*) FROM downlink_messages",
  };

  let { rows } = await db.query(query.text);

  for (let i = 1; i <= rows[0].count; i++) {
    await db.query(
      `UPDATE downlink_messages set duty_cycle_remaining=${randomIntFromInterval(
        0,
        36000
      )} where dev_id = ${i}`
    );
    console.log(i);
  }
};

const setRandomDutyCycleRemainingUplink = async () => {
  const query = {
    text: "SELECT COUNT(*) FROM uplink_messages",
  };

  let { rows } = await db.query(query.text);

  for (let i = 1; i <= rows[0].count; i++) {
    await db.query(
      `UPDATE uplink_messages set duty_cycle_remaining=${randomIntFromInterval(
        0,
        36000
      )} where dev_id = ${i}`
    );
    console.log(i);
  }
};

const addNamesToNodes = async () => {
  const query = {
    text: "SELECT COUNT(*) FROM nodes",
  };

  let { rows } = await db.query(query.text);

  for (let i = 1; i <= rows[0].count; i++) {
    await db.query(
      `UPDATE nodes SET name = '${faker.commerce.productName()}' where dev_id = ${i}`
    );
    console.log(i);
  }
};

const addFirmwareNodes = async () => {
  const query = {
    text: "SELECT COUNT(*) FROM nodes",
  };

  let { rows } = await db.query(query.text);

  for (let i = 1; i <= rows[0].count; i++) {
    await db.query(
      `UPDATE nodes SET firmware = '${randomIntFromInterval(
        0,
        3
      )}.${randomIntFromInterval(0, 15)}.${randomIntFromInterval(
        1,
        20
      )}' where dev_id = ${i}`
    );
    console.log(i);
  }
};

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

const addGeoToNodes = async () => {
  const query = {
    text: "SELECT COUNT(*) FROM nodes",
  };

  let { rows } = await db.query(query.text);

  for (let i = 1; i <= rows[0].count; i++) {
    await db.query(
      `UPDATE nodes ` +
        `SET lat = ${faker.address.latitude()}, lng = ${faker.address.longitude()} ` +
        `WHERE dev_id = ${i}`
    );
    console.log(i);
  }
};

exports.populateDatabase = populateDatabase;
