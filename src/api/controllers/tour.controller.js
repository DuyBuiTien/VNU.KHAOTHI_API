const httpStatus = require('http-status');
const { omit } = require('lodash');

const db = require('../../config/mssql');

const Tour = db.tour;
const Image = db.image;
const { Op } = db.Sequelize;

exports.findOne = async (req, res, next) => {
  console.log(req.params)
  try {
    const { id } = req.params;
    const attributes = [
      'id',
      'place_id',
      'title',
      'orderId',
      'tag',
      'period',
      'image',
      'description',
      'price',
      'note',
      'isFeatured',
    ];

    Tour.findOne({
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

  Tour.destroy({
    where: {
      id,
    },
  })
    .then((data) => res.json(data))
    .catch((e) => next(e));
};


exports.update = async (req, res, next) => {
  const { id } = req.params;

  let item = await Tour.findByPk(id);
  const imgHeader = await Image.destroy({
    where: {
      tourDetail_id: id,
      place_id: null
    }
  })
  const createImg = await Image.create(req.body.imageList)
    .then(res => res)
    .catch(e => next(e))

  const updatedItem = omit(req.body, ['']);
  item = Object.assign(item, updatedItem);
  item
    .save()
    .then((data) => res.json(data))
    .catch((e) => next(e));
};

exports.create = async (req, res, next) => {
  try {
    const itemData = omit(req.body, 'id');

    const item = await Tour.create(itemData)
      .then((result) => res.send(result))
      .catch((err) => next(err));

    res.status(httpStatus.CREATED);
  } catch (error) {
    console.log(error);
  }
};

exports.findAll = async (req, res, next) => {
  const { place_id, isFeatured, q, page, perpage } = req.query;
  //const { place_id } = req.params;
  const { limit, offset } = getPagination(page, perpage);
  const condition = [{ place_id: place_id }, isFeatured ? { isFeatured: isFeatured } : null];
  const attributes = [
    'id',
    'title',
    'period',
    'orderId',
    'tag',
    'description',
    'price',
    'note',
    'isFeatured',
    'image',
    'place_id',
    'createdAt',
    'updatedAt',
  ];
  var tours = await Tour.findAndCountAll({
    where: place_id ? condition : null,
    limit,
    offset,
    attributes,
    order: [
      ['place_id', 'ASC'],
      ['orderId', 'ASC'],
    ],
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
};

exports.findAllTag = async (req, res, next) => {
  const { q, page, perpage } = req.query;
  const { limit, offset } = getPagination(page, perpage);
  const condition = { tag: true };
  const attributes = [
    'id',
    'title',
    'period',
    'orderId',
    'tag',
    'description',
    'price',
    'note',
    'isFeatured',
    'place_id',
    'createdAt',
    'updatedAt',
  ];
  Tour.findAndCountAll({
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

exports.findAllFeatured = async (req, res, next) => {
  const { q, page, perpage } = req.query;
  const { limit, offset } = getPagination(page, perpage);
  const condition = { isFeatured: true };
  const attributes = [
    'id',
    'title',
    'period',
    'orderId',
    'tag',
    'description',
    'price',
    'note',
    'isFeatured',
    'place_id',
    'createdAt',
    'updatedAt',
  ];
  Tour.findAndCountAll({
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
