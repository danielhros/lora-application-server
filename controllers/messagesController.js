const { Op } = require("sequelize");
const MessagesView = require("../models/MessagesView");
const UplinkMessages = require("../models/UplinkMessages");
const DownlinkMessages = require("../models/DownlinkMessages");
const { sequelize } = require("../db");

const PER_PAGE = 10;

const allMessages = async (req, res) => {
    const {query} = req;
    const page = query.page ?? 1;
    let whereQuery = {};
    if(query.device_id) {
        whereQuery = {device_id: query.device_id};
    }
    else if(query.gateway) {
        whereQuery = {gateway: query.gateway};
    }
    // datetime query
    if(query.dateFrom && query.dateTo) {
        whereQuery = {
            ...whereQuery, 
            datetime: {
                [Op.gte]: query.dateFrom,
                [Op.lte]: query.dateTo,
            }
        }
    }
    else if(query.dateFrom) {
        whereQuery = {
            ...whereQuery, 
            datetime: {
                [Op.gte]: query.dateFrom,
            }
        }
    }
    else if(query.dateTo) {
        whereQuery = {
            ...whereQuery, 
            datetime: {
                [Op.lte]: query.dateTo,
            }
        }
    }

    if(query.types) {
        whereQuery = {
            ...whereQuery, 
            type: [],
        }
        if(query.types && query.types.includes('uplink')) {
            whereQuery.type.push(0);
        }
        if(query.types && query.types.includes('downlink') && query.types.includes('scheduled')) {
            whereQuery.type.push(1);
        }
        else if(query.types && query.types.includes('downlink')) {
            whereQuery.type.push(1);
            whereQuery = {
                ...whereQuery, 
                sent: true,
            }
        }
        else if(query.types && query.types.includes('scheduled')) {
            whereQuery.type.push(1);
            whereQuery = {
                ...whereQuery, 
                sent: false,
            }
        }
    }

    if(query.text && query.text !== '') {
        whereQuery = {
            ...whereQuery, 
            device_id: {
                [Op.like]: '%'+query.text+'%'
            },
        }
    }

    const messageView = await MessagesView.findAndCountAll({
        where: whereQuery,
        limit: PER_PAGE, offset: (page - 1) * PER_PAGE,
        order: [query.orderBy]
    });

    const {count} = messageView;

    res.json({
        ...messageView,
        pagination: {
            current: page,
            pages: Math.ceil(count / PER_PAGE),
        },
    });
}

const messageDetail = async (req, res) => {
    if(req.params.type == 0) {
        let result = await UplinkMessages.findByPk(req.params.id);
        res.json({...result.dataValues, type: "Uplink"});
    }
    else {
        let result = await DownlinkMessages.findByPk(req.params.id);
        res.json({...result.dataValues, type: "Downlink"});
    }
    
}


const messagesChart = async (req, res) => {
    
    const {q} = req.query;
    const {device_id} = req.query;

    let _date = null;
    const today = new Date('2021-04-25');
    switch(q) {
        case 'day':
            _date = new Date(today.getFullYear(), today.getMonth(), today.getDate()-1);
            break;
        case 'week':
            _date = new Date(today.getFullYear(), today.getMonth(), today.getDate()-7);
            break;
        case 'month':
            _date = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
            break;
        default: // year
            _date = new Date(today.getFullYear()-1, today.getMonth(), today.getDate());
    }

    const messages =  await MessagesView.findAll({ 
        attributes: [
            [sequelize.fn('DATE', sequelize.col('datetime')), 'date'],
            [sequelize.literal('COUNT(id) FILTER(where type = 1)'), 'uplink'],
            [sequelize.literal('COUNT(id) FILTER(where type = 0)'), 'downlink'],
        ],
        where: {
            datetime: {
                [Op.gte]: _date,
            },
            device_id: device_id ? device_id : {[Op.not]: null}
        },
        group: ['date'],
        order: sequelize.literal('date DESC'),
    });
    res.json(messages);

}


const messagesDashboard = async (req, res) => {
    const messageView = await MessagesView.findAll({
        limit: 10,
        order: [
            sequelize.literal('datetime DESC')
        ]
    });

    res.json(messageView);
}

module.exports = {
    allMessages, messageDetail, messagesChart, messagesDashboard
}