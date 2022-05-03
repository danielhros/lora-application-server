const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const DownlinkMessages = sequelize.define('downlink_messages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    app_data: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    sent: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    ack_required: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    delivered: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    send_time: {
        type: DataTypes.DATE,
        allowNull: false,        
    },
    frequency: {
        type: DataTypes.INTEGER,
        allowNull: true,        
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
    },
    airtime: {
        type: DataTypes.INTEGER,
        allowNull: false,        
    },
    coderate: {
        type: DataTypes.STRING,
        allowNull: false,        
    },
    bandwidth: {
        type: DataTypes.INTEGER,
        allowNull: false,        
    },
    dev_id: {
        type: DataTypes.INTEGER,
        allowNull: false,        
    },
    application_id: {
        type: DataTypes.INTEGER,
        allowNull: false,        
    },

   
}, { timestamps: false });

module.exports = DownlinkMessages;