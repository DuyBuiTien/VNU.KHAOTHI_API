const httpStatus = require('http-status');
const { omit } = require('lodash');
const { sendMail } = require('../services/emails/emailProvider');

const db = require('../../config/mssql');

const BookTour = db.bookTour;
const EmailTemplate = db.emailTemplate;
const TourDetail = db.tourDetail;
const { Op } = db.Sequelize;

exports.findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attributes = [
      'id',
      'email',
      'name',
      'phoneNumber',
      'specialRequirement',
      'tourCode',
      'tour_id',
      'favoritePlace',
      'dateStart',
      'dateEnd',
      'sumPeople',
      'sumChildren5to12',
      'sumChildrenUnder5',
      'status',
      'createdAt',
      'updatedAt',
    ];

    BookTour.findOne({
      where: { id },
      attributes,
    })
      .then((results) => res.json(results))
      .catch((e) => next(e));
  } catch (error) {
    next(error);
  }
};
exports.remove = (req, res, next) => {
  const { id } = req.params;

  BookTour.destroy({
    where: {
      id,
    },
  })
    .then((data) => res.json(data))
    .catch((e) => next(e));
};

exports.update = async (req, res, next) => {
  const { id } = req.query;
  let item = await BookTour.findByPk(id);

  const updatedItem = omit(req.body, ['']);
  item = Object.assign(item, updatedItem);
  item
    .save()
    .then((data) => res.json(data))
    .catch((e) => next(e));
};
exports.updateItem = async (req, res, next) => {
  const { id } = req.params;
  let item = await BookTour.findByPk(id);

  const updatedItem = omit(req.body, ['']);
  item = Object.assign(item, updatedItem);
  item
    .save()
    .then((data) => res.json(data))
    .catch((e) => next(e));
};
const sendEmail = async (emails, title, contentData) => {
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
      where: { isDefault: true, isConfirm: true },
    }).then((result) => {
      return result.toJSON();
    });
    var tourDetail = await TourDetail.findOne({
      where: { code: req.body.tourCode },
    }).then((result) => {
      return result.toJSON();
    });
    var contentData = '';
    contentData = template.contentData;
    contentData = contentData.replace(/@tenkhach/g, req.body.name);
    contentData = contentData.replace(/@tenchuongtrinh/g, tourDetail.title);
    contentData = contentData.replace(/@machuongtrinh/g, req.body.tourCode);
    contentData = contentData.replace(/@ngaykhoihanh/g, new Date(req.body.dateStart).toLocaleString());
    contentData = contentData.replace(/@ngayketthuc/g, new Date(req.body.dateEnd).toLocaleString());
    contentData = contentData.replace(/@songuoilon/g, req.body.sumPeople);
    contentData = contentData.replace(/@5den12/g, req.body.sumChildren5to12);
    contentData = contentData.replace(/@duoi5/g, req.body.sumChildrenUnder5);
    await sendEmail(itemData.email, template.title, contentData);
    const item = await BookTour.create(itemData)
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
  const attributes = [
    'id',
    'email',
    'name',
    'phoneNumber',
    'specialRequirement',
    'tourCode',
    'tour_id',
    'favoritePlace',
    'dateStart',
    'dateEnd',
    'sumPeople',
    'sumChildren5to12',
    'sumChildrenUnder5',
    'status',
    'createdAt',
    'updatedAt',
  ];
  BookTour.findAndCountAll({
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
