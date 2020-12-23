const httpStatus = require('http-status');
const { omit } = require('lodash');
const nodemailer = require('nodemailer');
const Email = require('email-templates');
const smtpTransport = require('nodemailer-smtp-transport');
const { emailConfig } = require('../../config/vars');

const db = require('../../config/mssql');

const EmailTemplate = db.emailTemplate;

const { Op } = db.Sequelize;

exports.update = async (req, res, next) => {
  const { id } = req.params;
  let item = await EmailTemplate.findByPk(id);
  if (!item) {
    res.sendStatus(400);
  }
  if (req.body.isDefault == true) {
    var conditions
    if (req.body.isConfirm == true) {
      conditions = { isConfirm: true }
    } else if (req.body.isSubscribe == true) {
      conditions = { isSubscribe: true }
    }
    try {
      await EmailTemplate.update({ isDefault: false }, { where: conditions });
    } catch (error) {
      console.log(error);
    }
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

  EmailTemplate.destroy({
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
    if (itemData.isDefault == true) {
      await EmailTemplate.update({ isDefault: false }, { where: { id: { [Op.gt]: 0 } } });
    }
    const item = await EmailTemplate.create(itemData)
      .then((result) => result)
      .catch((err) => next(err));

    res.status(httpStatus.CREATED);
    return res.json(item);
  } catch (error) {
    console.log(error);
  }
};

exports.findAll = async (req, res, next) => {
  const { isConfirm, isSubscribe, page, perpage } = req.query;
  const { limit, offset } = getPagination(page, perpage);
  const condition = isConfirm ? { isConfirm: isConfirm } : isSubscribe ? { isSubscribe: isSubscribe } : null;
  const attributes = ['id', 'type', 'title', 'contentData', 'isDefault', 'isConfirm', 'isSubscribe', 'createdAt', 'updatedAt'];
  EmailTemplate.findAndCountAll({
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
