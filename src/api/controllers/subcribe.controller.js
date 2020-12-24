const httpStatus = require('http-status');
const { omit } = require('lodash');
const nodemailer = require('nodemailer');
const Email = require('email-templates');
const smtpTransport = require('nodemailer-smtp-transport');
const { emailConfig } = require('../../config/vars');
const { sendMail } = require('../services/emails/emailProvider');
const db = require('../../config/mssql');
const Subscribe = db.subscribe;
const EmailTemplate = db.emailTemplate;
const { Op } = db.Sequelize;

exports.sendEmail = async (req, res) => {
  try {
    // Lấy data truyền lên từ form phía client
    const { emails, title, contentData } = req.body;
    // Thực hiện gửi email
    var temp = await sendMail(emails, title, contentData);
    // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
    console.log(temp);
    res.send('<h3>Your email has been sent successfully.</h3>');
  } catch (error) {
    // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
    console.log(error);
    res.send(error);
  }
};
exports.update = async (req, res, next) => {
  const { id } = req.params;
  let item = await Subscribe.findByPk(id);
  if (!item) {
    res.sendStatus(400);
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

  Subscribe.destroy({
    where: {
      id,
    },
  })
    .then((data) => res.json(data))
    .catch((e) => next(e));
};
const sendEmailSub = async (emails, title, contentData) => {
  try {
    // Thực hiện gửi email
    var temp = await sendMail(emails, title, contentData);
    // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
    return '<h3>Your email has been sent successfully.</h3>';
  } catch (error) {
    // Nếu có lỗi thì log ra để kiểm tra và cũng gửi về client
    console.log(error);
    return error;
  }
};
exports.create = async (req, res, next) => {
  try {
    const itemData = omit(req.body, '');
    var template = await EmailTemplate.findOne({
      where: { isDefault: true, isSubscribe: true },
    }).then((result) => {
      return result.toJSON();
    });
    var contentData = '';
    contentData = template.contentData;
    contentData = contentData.replace(/@buttonXacNhan/g, '<button type="button">Xác nhận theo dõi !</button>');
    await sendEmailSub(itemData.email, template.title, contentData);
    const item = await Subscribe.create(itemData)
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
  const attributes = ['id', 'email', 'createdAt', 'updatedAt'];
  Subscribe.findAndCountAll({
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
