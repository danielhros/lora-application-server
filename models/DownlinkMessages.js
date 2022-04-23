const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const DownlinkMessages = sequelize.define('downlink_messages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    send_time: {
        type: DataTypes.DATE,
        allowNull: false,        
    },
    node_id: {
        type: DataTypes.STRING,
        allowNull: false,        
    },
    spf: {
        type: DataTypes.INTEGER,
        allowNull: false,        
    },
    power: {
        type: DataTypes.INTEGER,
        allowNull: false,        
    },
    ap_id: {
        type: DataTypes.STRING,
        allowNull: false,  
        references: {
            model: 'aps', // 'fathers' refers to table name
            key: 'id', // 'id' refers to column name in fathers table
         }      
    },
    duty_cycle_remaining: {
        type: DataTypes.INTEGER,
        allowNull: false,        
    }
   
}, { timestamps: false });

module.exports = DownlinkMessages;