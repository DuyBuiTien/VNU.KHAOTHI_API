const httpStatus = require('http-status');
const { omit } = require('lodash');
const nodemailer = require('nodemailer');
const Email = require('email-templates');
const smtpTransport = require('nodemailer-smtp-transport');
const { emailConfig } = require('../../config/vars');

const db = require('../../config/mssql');

const Subscribe = db.subscribe;

const { Op } = db.Sequelize;

const sendMail = (emails, titleEmail, contentEmail) => {
  // Khởi tạo một thằng transporter object sử dụng chuẩn giao thức truyền tải SMTP với các thông tin cấu hình ở trên.
  const transporter = nodemailer.createTransport({
    host: emailConfig.host,
    port: emailConfig.port,
    secure: false,
    //service: 'gmail',
    auth: {
      user: emailConfig.username,
      pass: emailConfig.password,
    },
    secure: false, // upgrades later with STARTTLS -- change this based on the PORT
  });
  const options = {
    from: emailConfig.username, // địa chỉ admin email bạn dùng để gửi
    to: emails, // địa chỉ gửi đến
    subject: titleEmail, // Tiêu đề của mail
    html: contentEmail, // Phần nội dung mail mình sẽ dùng html thay vì thuần văn bản thông thường.
  };
  // hàm transporter.sendMail() này sẽ trả về cho chúng ta một Promise
  return transporter.sendMail(options);
};
exports.sendEmail = async (req, res) => {
  try {
    // Lấy data truyền lên từ form phía client
    const { emails, titleEmail, contentEmail } = req.body;
    // Thực hiện gửi email
    await sendMail(emails, titleEmail, contentEmail);
    // Quá trình gửi email thành công thì gửi về thông báo success cho người dùng
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

exports.create = async (req, res, next) => {
  try {
    const itemData = omit(req.body, '');

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
