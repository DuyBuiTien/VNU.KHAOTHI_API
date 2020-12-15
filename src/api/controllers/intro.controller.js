const httpStatus = require('http-status');
const { omit } = require('lodash');

const db = require('../../config/mssql');

const Intro = db.intro;
const Banner = db.banner;
const { Op } = db.Sequelize;

exports.updateImage = async (req, res, next) => {
  try {
    var imageDel = await Banner.findAll({
      where: { isIntro: true },
    });
    imageDel.forEach((item) => {
      var ind = req.body.imagesHeader.findIndex((key) => (item.uid = key.uid));
      if (ind == -1) {
        fs.unlinkSync(item.path);
      }
    });
    Banner.destroy({
      where: {
        isIntro: true,
      },
    })
      .then((result) => result)
      .catch((e) => next(e));
    console.log(req.body);
    req.body.imagesHeader.forEach(async (i) => {
      const temp = await Banner.create(i)
        .then((result) => res.json('ok'))
        .catch((err) => next(err));
    });
  } catch (error) {
    next(error);
  }
};

exports.findAllImages = async (req, res, next) => {
  const { q, page, perpage } = req.query;
  const { limit, offset } = getPagination(page, perpage);
  const condition = null;
  const attributes = ['id', 'uid', 'url', 'isHome', 'isIntro', 'createdAt', 'updatedAt'];
  Banner.findAll({
    where: { isIntro: true },
    limit,
    offset,
    attributes,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => next(e));
};

exports.findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attributes = ['id', 'title', 'contentData'];

    Intro.findOne({
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

  Intro.destroy({
    where: {
      id,
    },
  })
    .then((data) => res.json(data))
    .catch((e) => next(e));
};

exports.update = async (req, res, next) => {
  const { id } = req.params;
  let item = await Intro.findByPk(id);

  const updatedItem = omit(req.body, ['id']);
  item = Object.assign(item, updatedItem);
  item
    .save()
    .then((data) => res.json(data))
    .catch((e) => next(e));
};

exports.create = async (req, res, next) => {
  try {
    const itemData = omit(req.body, '');

    const item = await Intro.create(itemData)
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
  const attributes = ['id', 'title', 'contentData', 'createdAt', 'updatedAt'];
  Intro.findAndCountAll({
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
