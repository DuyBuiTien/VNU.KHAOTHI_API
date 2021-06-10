const httpStatus = require('http-status');
const { omit } = require('lodash');

const db = require('../../config/mssql');

const { Student_Accs, Student_Infos, Student_Cathis, Dangkythi_Lephis } = db;

const { Op } = db.Sequelize;

exports.findOne = async (req, res, next) => {
    const { Id } = req.params;

    Student_Accs.findOne({
        where: { Id: Id },
        attributes: {
            exclude: ['password']
        }
    })
        .then((results) => res.json(results))
        .catch((e) => next(e));
};

exports.update = async (req, res, next) => {
    try {
        const { Id } = req.params;
        let item = await Student_Accs.findByPk(Id);

        if (item) {
            const itemData = omit(req.body, 'Id');
            item = Object.assign(item, itemData);
            const itemnew = await item.save();
            res.json(itemnew);
        } else {
            res.json(item);
        }
    } catch (error) {
        next(error);
    }
};

exports.remove = async (req, res, next) => {
    try {
        const { tendangnhap } = req.body;

        const acc = await Student_Accs.destroy({
            where: {
                tendangnhap,
            },
        })

        Dangkythi_Lephis.destroy({
            where: { username: tendangnhap }
        })

        Student_Cathis.destroy({
            where: { username: tendangnhap }
        })

        Student_Infos.destroy({
            where: { tendangnhap }
        }).then(e => res.json(e))
            .catch(e => next(e))
    } catch (error) {
        next(error);
    }
};

exports.findAll = async (req, res, next) => {
    const { q, page, perpage, pagination } = req.query;
    const { limit, offset } = getPagination(page, perpage);
    const condition = q ? [{ Slug: { [Op.like]: `%${q}%` } }, condition1] : null;
    if (pagination === 'true') {
        Student_Accs.findAndCountAll({
            where: condition,
            limit,
            offset,
            attributes: {
                exclude: ['password']
            }
        })
            .then((data) => {
                const response = getPagingData(data, page, limit);
                res.json(response);
            })
            .catch((e) => next(e));
    }
    else {
        Student_Accs.findAll({
            where: condition,
            offset,
            attributes: {
                exclude: ['password']
            }
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
