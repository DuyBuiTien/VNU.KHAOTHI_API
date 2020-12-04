const httpStatus = require('http-status');
const { omit } = require('lodash');

const db = require('../../config/mssql');

const Subcribe = db.subcribe;

const { Op } = db.Sequelize;

exports.update = async (req, res, next) => {
  const { id } = req.params;
  let item = await Subcribe.findByPk(id);
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

  Subcribe.destroy({
    where: {
      id,
    },
  })
    .then((data) => res.json(data))
    .catch((e) => next(e));
};

exports.create = async (req, res, next) => {
  try {
    const itemData = omit(req.body, '');


    const item = await Subcribe.create(itemData)
      .then((result) => result)
      .catch((err) => next(err));

    res.status(httpStatus.CREATED);
    return res.json(item);
  } catch (error) {
    console.log(error);
  }
};

exports.findAll = async (req, res, next) => {
  const { q, page, perpage } = req.query;
  const { limit, offset } = getPagination(page, perpage);
  const condition = null;
  const attributes = ['id', 'email'];
  Subcribe.findAndCountAll({
    where: condition,
    limit,
    offset,
    attributes,
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.json(response);
    })
    .catch((e) => next(e));
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
