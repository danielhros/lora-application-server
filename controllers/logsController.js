const { Op } = require("sequelize");
const { sequelize } = require("../db");
const Logs = require("../models/Logs");
const Nodes = require("../models/Nodes");

const PER_PAGE = 30;

function calcReliable(groupedLogs, countAll) {

    let countB3 = 0;
    let countB2 = 0;
    let countB1 = 0;
    let countP3 = 0;
    let countP2 = 0;
    let countP1 = 0;

    groupedLogs.forEach(item => {
        const elem = item.dataValues;

        if(elem.severity == 3 && elem.component === 'PDR') {
            countP3 = elem.total;
        }
        else if(elem.severity == 2 && elem.component === 'PDR') {
            countP2 = elem.total;
        }
        else if(elem.severity == 1 && elem.component === 'PDR') {
            countP1 = elem.total;
        }
        else if(elem.severity == 3 && (elem.component === 'battery' || elem.component === 'batéria')) {
            countB3 = elem.total;
        }
        else if(elem.severity == 2 && (elem.component === 'battery' || elem.component === 'batéria')) {
            countB2 = elem.total;
        }
        else if(elem.severity == 1 && (elem.component === 'battery' || elem.component === 'batéria')) {
            countB1 = elem.total;
        }

    });
    const indexB3 = 0.05;
    const indexB2 = 0.1;
    const indexB1 = 0.15;
    const indexP3 = 0.1;
    const indexP2 = 0.15;
    const indexP1 = 0.2;


    return (((countB3*indexB3 + countB2*indexB2 + countB1*indexB1 + 
        countP3*indexP3 + countP2*indexP2 + countP1*indexP1)/countAll * indexP3)*10).toFixed(2);
}

const dashboardLog = async (req, res) => {
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

    if(query.text && query.text !== '') {
        whereQuery = {
            ...whereQuery, 
            device_id: {
                [Op.like]: '%'+query.text+'%'
            },
        }
    }

    const devices = await Nodes.findAndCountAll();
    const groupedLogs = await Logs.findAll({ 
        attributes: [
            'severity', 'component',
            [sequelize.literal('COUNT(severity)'), 'total'],
        ],
        group: ['severity', 'component'],
    });

    const reliability = calcReliable(groupedLogs, devices.count);

    const chartView = await Logs.findAll({ 
        attributes: [
            [sequelize.fn('DATE', sequelize.col('date')), 'date'],
            [sequelize.literal('COUNT(severity) FILTER(where severity = 1)'), 'severity1'],
            [sequelize.literal('COUNT(severity) FILTER(where severity = 2)'), 'severity2'],
            [sequelize.literal('COUNT(severity) FILTER(where severity = 3)'), 'severity3'],
        ],
        group: ['severity','date'],
        order: sequelize.literal('date DESC'),
    });

    const tableView = await Logs.findAndCountAll({
        attributes: [
            'severity', 'component', 'device_id', 'description', 
            [sequelize.fn('DATE', sequelize.col('date')), 'date'],
        ],
        where: whereQuery,
        limit: PER_PAGE, offset: (page - 1) * PER_PAGE,
        order: ['date']
    });

    const {count} = tableView;

    res.json({
        reliability: reliability,
        severity: groupedLogs,
        chart: chartView,
        table: {
            ...tableView,
            pagination: {
                current: page,
                pages: Math.ceil(count / PER_PAGE),
            },
        },
    });
}

module.exports = {
    dashboardLog,
}