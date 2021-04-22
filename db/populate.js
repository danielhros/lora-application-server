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
  // await addApsConfig();
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

const addApsConfig = async () => {
  let i = 0;

  while (true) {
    let query = {
      text: `select id from aps order by id limit 1 offset ${i} `,
    };

    let { rows } = await db.query(query.text);
    let apId = rows[0]?.id;

    // console.log(apId);

    if (apId == undefined) {
      break;
    }

    query.text =
      `insert into aps_config (setap, gateway_id) ` +
      `VALUES ('{"message_name":"SETAP","ap_id":"${apId}","message_body":[{"type":"NORMAL","cr":"4/5","freqs":[867.1,"none","none","none","none","none","none","none","none"],"band":125,"power":5,"sf":7},{"type":"EMER","cr":"4/5","freqs":["none","none","none","none","none",868.3,"none","none","none"],"band":125,"power":5,"sf":7},{"type":"REG","cr":"4/5","freqs":[867.3,"none",867.5,"none","none","none","none","none","none"],"band":125,"power":5,"sf":7}]}'::json, '${apId}')`;

    await db.query(query.text);

    console.log(apId);

    i += 1;
  }
};

exports.populateDatabase = populateDatabase;
