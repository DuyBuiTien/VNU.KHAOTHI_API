const httpStatus = require('http-status');
const { omit } = require('lodash');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const APIError = require('../utils/APIError');
const db = require('../../config/mssql');
const { staticUrl } = require('../../config/vars');

const storagePhoto = require('../utils/storagePhoto');
const storageFile = require('../utils/storageFile');

const Place = db.place;
const Tour = db.tour;
const TourDetail = db.tourDetail;
const TourDetailDescription = db.tourDetailDescription;
const ScheduleDetail = db.scheduleDetail;
const Service = db.service;
const Rule = db.rule;
const Policy = db.policy;
const Image = db.image;

const { Op } = db.Sequelize;

const photosUploadFile = multer(storagePhoto).single('upload');

exports.addPhotos = (req, res, next) => {
  const currentUser = req.user;

  photosUploadFile(req, res, async (err) => {
    console.log(req.file.path);
    try {
      if (!req.file) {
        console.log(err);
        throw new APIError({
          message: err,
          status: httpStatus.BAD_REQUEST,
        });
      }
      const outputFile = `${req.file.path}.jpg`;

      await sharp(req.file.path).jpeg({ quality: 80 }).toFile(outputFile);

      // delete old file
      fs.unlinkSync(req.file.path);
      return res.json({
        url: `${staticUrl}/public/images/${req.file.filename}.jpg`,
        path: `public/images/${req.file.filename}.jpg`,
      });
    } catch (error) {
      next(error);
    }
  });
};

exports.findOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const attributes = ['id', 'title', 'sumHotel', 'image', 'isFeatured', 'placeOrder'];

    var places = await Place.findOne({
      where: { id },
      attributes,
    });

    var images = await Image.findAll({ where: [{ place_id: places.id }, { tourDetail_id: null }] });
    var responsePlace = { ...places.toJSON(), imagesHeader: [] };
    responsePlace.imagesHeader = images;
    res.json(responsePlace);
  } catch (error) {
    next(error);
  }
};
exports.remove = async (req, res, next) => {
  const { id } = req.params;
  var tour = await Tour.findAll({ where: { place_id: id } });
  tour.forEach(async (item) => {
    const del1 = await Policy.destroy({
      where: {
        tourDetail_id: item.id,
      },
    });
    const del2 = await Service.destroy({
      where: {
        tourDetail_id: item.id,
      },
    });
    const del3 = await ScheduleDetail.destroy({
      where: {
        tourDetail_id: item.id,
      },
    });
    const del4 = await TourDetailDescription.destroy({
      where: {
        tourDetail_id: item.id,
      },
    });
    const del5 = await Rule.destroy({
      where: {
        tourDetail_id: item.id,
      },
    });
    const del6 = await TourDetail.destroy({
      where: {
        tour_id: item.id,
      },
    });
  });
  const del7 = await Tour.destroy({
    where: {
      place_id: id,
    },
  });
  const del8 = await Image.destroy({
    where: {
      place_id: id,
    },
  });
  Place.destroy({
    where: {
      id,
    },
  })
    .then((data) => res.json(data))
    .catch((e) => next(e));
};
exports.updateItem = async (req, res, next) => {
  const { id } = req.params;
  let item = await Place.findByPk(id);

  const updatedItem = omit(req.body, ['']);
  item = Object.assign(item, updatedItem);
  item
    .save()
    .then((data) => res.json(data))
    .catch((e) => next(e));
};
exports.update = async (req, res, next) => {
  const { id } = req.params;
  Image.destroy({
    where: {
      place_id: id,
      tourDetail_id: null,
    },
  })
    .then((result) => result)
    .catch((e) => next(e));

  req.body.imagesHeader.forEach(async (i) => {
    const temp = await Image.create(i)
      .then((result) => result)
      .catch((err) => next(err));
  });

  let item = await Place.findByPk(id);
  const updatedItem = omit(req.body, ['imagesHeader']);
  item = Object.assign(item, updatedItem);
  item
    .save()
    .then((data) => res.json(id))
    .catch((e) => next(e));
};

exports.create = async (req, res, next) => {
  try {
    const itemData = omit(req.body, 'imagesHeader');

    const item = await Place.create(itemData)
      .then((result) => result)
      .catch((err) => next(err));

    req.body.imagesHeader.forEach(async (i) => {
      i.place_id = item.id;
      const temp = await Image.create(i)
        .then((result) => result)
        .catch((err) => next(err));
    });
    res.status(httpStatus.CREATED);
    return res.json(item.id);
  } catch (error) {
    console.log(error);
  }
};

exports.findAll = async (req, res, next) => {
  const { isFeatured, q, page, perpage } = req.query;
  const { limit, offset } = getPagination(page, perpage);
  console.log(isFeatured);
  const condition = isFeatured ? { isFeatured: isFeatured } : { isFeatured: true };
  const attributes = ['id', 'title', 'sumHotel', 'image', 'isFeatured', 'createdAt', 'updatedAt', 'placeOrder'];

  var places = await Place.findAndCountAll({
    where: condition,
    attributes,
    order: [['placeOrder', 'ASC']],
  });
  var images = await Image.findAll({ where: [{ place_id: { [Op.gt]: 0 } }, { tourDetail_id: null }] });
  var responsePlace = [];
  places.rows.forEach((item) => {
    var tempItem = { ...item.toJSON(), imagesHeader: [] };
    var temp = images.filter((i) => i.place_id == item.id);
    tempItem.imagesHeader = temp;
    responsePlace.push(tempItem);
  });
  const response = getPagingData({ count: places.count, rows: responsePlace }, page, limit);
  res.json(response);
  //var images = await Image.findAll({where: {id}})
  // .then((data) => {
  //   console.log(data.rows);
  //   const response = getPagingData(data, page, limit);
  //   res.json(response);
  // })
  // .catch((e) => next(e));
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
