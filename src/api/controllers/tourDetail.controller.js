const httpStatus = require('http-status');
const { omit } = require('lodash');

const db = require('../../config/mssql');

const TourDetail = db.tourDetail;

exports.findByTourDetailId = async (req, res, next) => {
    try {
        const attributes = ['id', 'code', 'title', 'isFeatured', 'priceTour', 'phoneNumber', 'startFrom', 'period', 'vehicle', 'createdAt', 'updatedAt', 'tour_id'];
        const { tour_id } = req.params;

        TourDetail.findAndCountAll({
            where: { tour_id },
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

        const item = await TourDetail.create(itemData)
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
    let item = await TourDetail.findByPk(id);
    if (!item) {
        res.sendStatus(400)
    }

    const updatedItem = omit(req.body, ['']);
    item = Object.assign(item, updatedItem);
    item
        .save()
        .then((data) => res.json(data))
        .catch((e) => next(e));
};

exports.remove = (req, res, next) => {
    const { id } = req.params;

    TourDetail.destroy({
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
    const attributes = ['id', 'code', 'title', 'isFeatured', 'priceTour', 'phoneNumber', 'startFrom', 'period', 'vehicle', 'createdAt', 'updatedAt', 'tour_id'];
    TourDetail.findAndCountAll({
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
