const { Op } = require("sequelize");
const MessagesView = require("../models/MessagesView");

const PER_PAGE = 10;

const allMessages = async (req, res) => {
    const {query} = req;
    const page = query.page ?? 1;
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
        limit: PER_PAGE, offset: (page - 1) * PER_PAGE,
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

module.exports = {
    allMessages,
}