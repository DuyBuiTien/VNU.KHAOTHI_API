const httpStatus = require('http-status');
const { omit } = require('lodash');

const db = require('../../config/mssql');

const Icon = db.icon;

exports.findByIconGroupId = async (req, res, next) => {
    try {
        const attributes = ['ID', 'TieuDe', 'ThuTu', 'ClassBieuTuong', 'ClassMauBieuTuong', 'NhomTienNghiID', 'SuDung', 'Ma'];
        const { NhomTienNghiID } = req.params;

        Icon.findAndCountAll({
            where: { NhomTienNghiID },
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
        const itemData = omit(req.body, 'ID');

        const item = await Icon.create(itemData)
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
    let item = await Icon.findByPk(id);
    if (!item) {
        res.sendStatus(400)
    }

    const updatedItem = omit(req.body, ['role', 'password']);
    item = Object.assign(item, updatedItem);
    item
        .save()
        .then((data) => res.json(data))
        .catch((e) => res.json(e));
};

exports.remove = (req, res, next) => {
    const { id } = req.params;

    Icon.destroy({
        where: {
            id,
        },
    })
        .then((data) => res.json(data))
        .catch((e) => next(e));
};

exports.findAll = async (req, res, next) => {
    const { q } = req.query;
    const condition = null;
    const attributes = ['ID', 'TieuDe', 'ThuTu', 'ClassBieuTuong', 'ClassMauBieuTuong', 'NhomTienNghiID', 'SuDung', 'Ma'];
    Icon.findAndCountAll({
        where: condition,
        attributes,
    })
        .then((data) => {
            res.json(data);
        })
        .catch((e) => console.log(e));
};
