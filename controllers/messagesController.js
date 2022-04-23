const { Op } = require("sequelize");
const MessagesView = require("../models/MessagesView");

const allMessages = async (req, res) => {
    const {query} = req;
    let whereQuery = {};
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
        limit: 5, offset: 0,
    });

    res.json(messageView);
}

module.exports = {
    allMessages,
}