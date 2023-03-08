const { Sequelize } = require('sequelize');

const { Pool } = require("pg");

const config = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DP_PASSWORD,
  port: process.env.DB_PORT,
};

const pool = new Pool(config);

const sequelize = new Sequelize(`postgres://${config.user}:${config.password}@${config.host}:${config.port}/${config.database}`);

module.exports = {
  query: (text, params) => pool.query(text, params),
  sequelize,
};
