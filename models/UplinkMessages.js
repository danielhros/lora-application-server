const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../db');

const UplinkMessages = sequelize.define('uplink_messages', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    receive_time: {
        type: DataTypes.DATE,
        allowNull: false,     
    },
    node_id: {
        type: DataTypes.STRING,
        allowNull: false,        
    },
    snr: {
        type: DataTypes.INTEGER,
        allowNull: false,        
    },
    rssi: {
        type: DataTypes.INTEGER,
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
    app_data: {
        type: DataTypes.STRING,
        allowNull: false,    
    },
    seq: {
        type: DataTypes.INTEGER,
        allowNull: false,        
    },
    frequency: {
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
    msg_group_number: {
        type: DataTypes.INTEGER,
        allowNull: false,        
    },
    message_type_id: {
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
    battery: {
        type: DataTypes.INTEGER,
        allowNull: false,        
    },
   
}, { timestamps: false });

module.exports = UplinkMessages;