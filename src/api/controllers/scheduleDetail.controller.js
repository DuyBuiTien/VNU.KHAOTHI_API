const httpStatus = require('http-status');
const { omit } = require('lodash');

const db = require('../../config/mssql');

const ScheduleDetail = db.scheduleDetail;

exports.findByTourDetailId = async (req, res, next) => {
    try {
        const attributes = ['id', 'title', 'shortcut', 'contentData', 'tourDetail_id'];
        const { tourDetail_id } = req.params;

        ScheduleDetail.findAll({
            where: { tourDetail_id },
            attributes
        })
            .then((results) => res.json(results))
            .catch((e) => next(e));
    } catch (error) {
        next(error);
    }
}

exports.create = async (req, res, next) => {
    try {
        const itemData = omit(req.body, 'id');

        const item = await ScheduleDetail.create(itemData)
            .then((result) => result)
            .catch((err) => next(err));

        res.status(httpStatus.CREATED);
        return res.json(item);
    } catch (error) {
        console.log(error);
    }
};

exports.update = async (req, res, next) => {
    const { id } = req.params;
    ScheduleDetail.destroy({
        where: {
            tourDetail_id: id
        }
    })
        .then((result) => res.send(result))
        .catch((e) => next(e));

    req.body.forEach(async (item) => {
        var updatedItem = omit(item, 'id')
        const temp = await ScheduleDetail.create(updatedItem)
            .then(result => result)
            .catch(e => next(e))
    })
    res.sendStatus(202)
};

exports.remove = (req, res, next) => {
    const { id } = req.params;

    ScheduleDetail.destroy({
        where: {
            id,
        },
    })
        .then((data) => res.json(data))
        .catch((e) => next(e));
};

exports.findAll = async (req, res, next) => {
    const { q, page, perpage } = req.query;
    const { limit, offset } = getPagination(page, perpage);
    const condition = null;
    const attributes = ['id', 'title', 'shortcut', 'contentData', 'tourDetail_id'];
    ScheduleDetail.findAndCountAll({
        where: condition,
        limit,
        offset,
        attributes,
    })
        .catch((e) => console.log(e));
};
const getPagination = (page, perpage) => {
    const limit = perpage ? perpage : 10;
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
