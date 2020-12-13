const httpStatus = require('http-status');
const { omit } = require('lodash');
const fs = require('fs');
const db = require('../../config/mssql');

const Banner = db.banner;
const { Op } = db.Sequelize;
exports.updateImage = async (req, res, next) => {
  try {
    Banner.destroy({
      where: {
        isHome: true,
      },
    })
      .then((result) => result)
      .catch((e) => next(e));

    req.body.imagesHeader.forEach(async (i) => {
      const temp = await Banner.create(i)
        .then((result) => result)
        .catch((err) => next(err));
    });
    res.json('ok');
  } catch (error) {
    next(error);
  }
};
exports.findAllImages = async (req, res, next) => {
  const { q, page, perpage } = req.query;
  const condition = null;
  const attributes = ['id', 'uid', 'url', 'isHome', 'isIntro', 'createdAt', 'updatedAt'];
  Banner.findAll({
    where: { isHome: true },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => next(e));
};
