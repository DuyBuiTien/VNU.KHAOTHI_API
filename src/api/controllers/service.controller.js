const httpStatus = require('http-status');
const { omit } = require('lodash');

const db = require('../../config/mssql');

const Service = db.service;

exports.findByTourDetailId = async (req, res, next) => {
    try {
        const attributes = ['id', 'title', 'icon', 'tourDetail_id'];
        const { tourDetail_id } = req.params;

        Service.findAndCountAll({
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

        const item = await Service.create(itemData)
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
    let item = await Service.findByPk(id);

    const updatedItem = omit(req.body, ['role', 'password']);
    item = Object.assign(item, updatedItem);
    item
        .save()
        .then((data) => res.json(data))
        .catch((e) => next(e));
};

exports.remove = (req, res, next) => {
    const { id } = req.params;

    Service.destroy({
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
    const attributes = ['id', 'title', 'icon', 'tourDetail_id'];
    Service.findAndCountAll({
        where: condition,
        limit,
        offset,
        attributes,
    })
        .then((data) => {
            const response = getPagingData(data, page, limit);
            res.json(response);
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
