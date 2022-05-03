const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Nodes = sequelize.define('nodes', {
    id: {
        type: DataTypes.STRING,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
   
}, { timestamps: false });

module.exports = Nodes;