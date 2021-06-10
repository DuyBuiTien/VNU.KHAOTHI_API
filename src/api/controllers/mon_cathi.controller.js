const httpStatus = require('http-status');
const { omit } = require('lodash');

const db = require('../../config/mssql');
const nofitiController = require('./notification.controller');

const { Mon_Cathis, Notifications } = db;

const { Op } = db.Sequelize;

exports.findOne = async (req, res, next) => {
    const { Id } = req.params;

    Mon_Cathis.findOne({
        where: { Id: Id },
    })
        .then((results) => res.json(results))
        .catch((e) => next(e));
};

exports.create = async (req, res, next) => {
    try {
        const itemData = omit(req.body, 'Id');

        const item = await Mon_Cathis.create(itemData);

        res.status(httpStatus.CREATED);
        return res.json(item);
    } catch (error) {
        next(error);
    }
};

exports.update = async (req, res, next) => {
    try {
        const { Id } = req.params;
        let item = await Mon_Cathis.findByPk(Id);

        if (item) {
            const itemData = omit(req.body, 'Id');
            item = Object.assign(item, itemData);
            const itemnew = await item.save();
            let dataSend = {
                topic: 'Thongbao',
                notification: {
                    title: `Thay đổi thông tin kỳ thi`,
                    message: `Thay đổi tại kỳ thi ${req.body.Makythi} và môn thi ${req.body.Mamonthi}`,
                },
                data: {
                    id: `1234`,
                    messageId: `2345`,
                    code: 'chat',
                    function: 'GuiTinNhan',
                }
            };
            let resultnotifi = await nofitiController.sendtoTopicLocal(dataSend);
            const x = await Notifications.create(dataSend.notification);
            res.json(itemnew);
        } else {
            res.json(item);
        }
    } catch (error) {
        next(error);
    }
};

exports.remove = (req, res, next) => {
    try {
        const { Id } = req.params;

        Mon_Cathis.destroy({
            where: {
                Id,
            },
        })
            .then((data) => res.json(data))
            .catch((e) => next(e));
    } catch (error) {
        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    const { q, page, perpage, pagination } = req.query;
    const { limit, offset } = getPagination(page, perpage);
    const condition = q ? [{ Slug: { [Op.like]: `%${q}%` } }, condition1] : null;
    if (pagination === 'true') {
        Mon_Cathis.findAndCountAll({
            where: condition,
            limit,
            offset,
        })
            .then((data) => {
                const response = getPagingData(data, page, limit);
                res.json(response);
            })
            .catch((e) => next(e));
    }
    else {
        Mon_Cathis.findAll({
            where: condition,
            offset,
        })
            .then((data) => {
                res.json(data);
            })
            .catch((e) => next(e));
    }
};

const getPagination = (page, perpage) => {
    const limit = perpage ? +perpage : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
};
const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: listItems } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return {
        meta: {
            total: totalItems,
            pages: totalPages,
            page: currentPage,
            perpage: limit,
        },
        data: listItems,
    };
};
