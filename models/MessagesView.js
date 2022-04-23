const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const MessagesView = sequelize.define('messages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    datetime: {
        type: DataTypes.DATE,
        allowNull: false,     
    },
    device_id: {
        type: DataTypes.STRING,
        allowNull: false,        
    },
    snr: {
        type: DataTypes.INTEGER,
        allowNull: true,        
    },
    rssi: {
        type: DataTypes.INTEGER,
        allowNull: true,        
    },
    spf: {
        type: DataTypes.INTEGER,
        allowNull: false,        
    },
    power: {
        type: DataTypes.INTEGER,
        allowNull: false,        
    },
    gateway: {
        type: DataTypes.STRING,
        allowNull: false,  
        references: {
            model: 'aps', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
         }      
    },
    dc_remaining: {
        type: DataTypes.INTEGER,
        allowNull: false,        
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,   
    },
    sent: {
        type: DataTypes.BOOLEAN,
        allowNull: true,   
    }
   
}, { timestamps: false });

module.exports = MessagesView;