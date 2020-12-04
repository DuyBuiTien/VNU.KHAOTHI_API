const httpStatus = require('http-status');
const { omit } = require('lodash');

const db = require('../../config/mssql');

const IconGroup = db.iconGroup;


exports.findAll = async (req, res, next) => {
    const { q, page, perpage } = req.query;
    const { limit, offset } = getPagination(page, perpage);
    const condition = null;
    const attributes = ['ID', 'TieuDe', 'ThuTu', 'SoCot', 'ClassBieuTuong', 'ClassMauBieuTuong', 'SuDung', 'Ma'];
    IconGroup.findAndCountAll({
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
