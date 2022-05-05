const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const Nodes = require('./Nodes');

const Logs = sequelize.define('logs', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    severity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    component: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,     
    },
    device_id: {
        type: DataTypes.STRING,
        allowNull: false,  
        references: {
            model: 'nodes', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
         }      
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },

   
}, { timestamps: false });

Logs.hasMany(Nodes, {
    foreignKey: {
      name: 'id'
    }
  });

module.exports = Logs;