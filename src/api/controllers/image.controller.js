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

const Image = db.image;

const { Op } = db.Sequelize;

const photosUploadFile = multer(storagePhoto).single('upload');

exports.addPhotos = (req, res, next) => {
  const currentUser = req.user;

  photosUploadFile(req, res, async (err) => {
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

      const temp = {
        uid: uuidv4(),
        name: `${req.file.filename}.jpg`,
        path: `/images/message/${req.file.filename}.jpg`,

        status: 'done',
        response: { status: 'success' },
        linkProps: { download: 'image' },
        thumbUrl: `${staticUrl}/images/message/${req.file.filename}.jpg`,
      };

      const dataItem = {
        tourDetail_id: null,
        place_id: null,
        imageUrl: `public/images/${req.file.filename}.jpg`,
      };
      const imageCreated = await Image.create(dataItem)
        .then((result) => result)
        .catch((err) => next(err));
      return res.json({ url: `${staticUrl}/public/images/${req.file.filename}.jpg`, id: imageCreated.dataValues.id});
    } catch (error) {
      next(error);
    }
  });
};
exports.remove = (req, res, next) => {
  const { id } = req.query;

  Image.destroy({
    where: {
      id,
    },
  })
    .then((data) => res.json(data))
    .catch((e) => next(e));
};

exports.update = async (req, res, next) => {
  const { id } = req.query;
  let item = await Image.findByPk(id);

  const updatedItem = omit(req.body, ['']);
  item = Object.assign(item, updatedItem);
  item
    .save()
    .then((data) => res.json(data))
    .catch((e) => next(e));
};

exports.create = async (req, res, next) => {
  try {
    const itemData = omit(req.body, '');

    const item = await Image.create(itemData)
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
  const attributes = ['id', 'imageUrl', 'tourDetail_id', 'tour_id', 'place_id'];
  Image.findAndCountAll({
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