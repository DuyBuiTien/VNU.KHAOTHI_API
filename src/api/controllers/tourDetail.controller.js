const httpStatus = require('http-status');
const { omit } = require('lodash');
const fs = require('fs');

const db = require('../../config/mssql');

const TourDetail = db.tourDetail;
const Image = db.image;
const { Op } = db.Sequelize;
exports.findByTourDetailId = async (req, res, next) => {
  const { q, page, perpage } = req.query;
  const { limit, offset } = getPagination(page, perpage);
  try {
    const attributes = [
      'id',
      'code',
      'title',
      'isFeatured',
      'priceTour',
      'phoneNumber',
      'startFrom',
      'period',
      'vehicle',
      'createdAt',
      'updatedAt',
      'tour_id',
    ];
    const { tour_id } = req.params;

    // TourDetail.findAndCountAll({
    //   where: { tour_id },
    //   attributes,
    // })
    //   .then((results) => res.json(results))
    //   .catch((e) => next(e));
    var tours = await TourDetail.findAndCountAll({
      where: { tour_id },
      attributes,
    });
    var images = await Image.findAll({ where: { tourDetail_id: { [Op.gt]: 0 } } });
    var responseTour = [];
    tours.rows.forEach((item) => {
      var tempItem = { ...item.toJSON(), listImages: [] };
      var temp = images.filter((i) => i.tourDetail_id == item.id);
      tempItem.listImages = temp;
      responseTour.push(tempItem);
    });
    const response = getPagingData({ count: tours.count, rows: responseTour }, page, limit);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const itemData = omit(req.body, 'id');

    const item = await TourDetail.create(itemData)
      .then((result) => res.send(result))
      .catch((err) => next(err));

    res.status(httpStatus.CREATED);
    return res.json(item);
  } catch (error) {
    console.log(error);
  }
};

exports.update = async (req, res, next) => {
  const { tourDetail_id, place_id } = req.params;

  Image.destroy({
    where: {
      place_id: place_id,
      tourDetail_id: tourDetail_id,
    },
  })
    .then((result) => result)
    .catch((e) => next(e));
  console.log(req.body.listImages);
  req.body.listImages.forEach(async (i) => {
    const temp = await Image.create(i)
      .then((result) => result)
      .catch((err) => next(err));
  });

  let item = await TourDetail.findByPk(tourDetail_id);
  const updatedItem = omit(req.body, ['']);
  item = Object.assign(item, updatedItem);
  item
    .save()
    .then((data) => res.json(data))
    .catch((e) => next(e));
};

exports.remove = (req, res, next) => {
  const { id } = req.params;

  TourDetail.destroy({
    where: {
      id,
    },
  })
    .then((data) => res.json(data))
    .catch((e) => next(e));
};

exports.findAll = async (req, res, next) => {
  const { q, page, perpage } = req.query;
  const { limit, offset } = getPagination(page, perpage);
  const condition = null;
  const attributes = [
    'id',
    'code',
    'title',
    'isFeatured',
    'priceTour',
    'phoneNumber',
    'startFrom',
    'period',
    'vehicle',
    'createdAt',
    'updatedAt',
    'tour_id',
  ];
  var tours = TourDetail.findAndCountAll({
    where: condition,
    limit,
    offset,
    attributes,
  });

  var images = await Image.findAll({ where: { tourDetail_id: { [Op.gt]: 0 } } });
  var responseTour = [];
  tours.rows.length > 0 && tours.rows && tours.rows.forEach((item) => {
    var tempItem = { ...item.toJSON(), listImages: [] };
    var temp = images.filter((i) => i.tourDetail_id == item.id);
    tempItem.imagesHeader = temp;
    responseTour.push(tempItem);
  });
  const response = getPagingData({ count: tours.count, rows: responseTour }, page, limit);
  console.log(response);
  res.json(response);
};
const getPagination = (page, perpage) => {
  const limit = perpage ? perpage : 10;
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
