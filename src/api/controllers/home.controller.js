const httpStatus = require('http-status');
const { omit } = require('lodash');
const fs = require('fs');
const db = require('../../config/mssql');

const Banner = db.banner;
const { Op } = db.Sequelize;
exports.updateImage = async (req, res, next) => {
  try {
    var imageDel = await Banner.findAll({
      where: { isHome: true },
    });
    imageDel.forEach((item) => {
      var ind = req.body.imagesHeader.findIndex((key) => (item.uid = key.uid));
      if (ind == -1) {
        fs.unlinkSync(item.path);
      }
    });
    Banner.destroy({
      where: {
        isHome: true,
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
  const condition = null;
  const attributes = ['id', 'uid', 'url', 'path', 'isHome', 'isIntro', 'isPlace', 'createdAt', 'updatedAt'];
  Banner.findAll({
    where: { isHome: true },
  })
    .then((data) => {
      res.json(data);
    })
    .catch((e) => next(e));
};
