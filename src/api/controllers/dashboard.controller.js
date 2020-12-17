const httpStatus = require('http-status');
const { omit } = require('lodash');

const db = require('../../config/mssql');

const Subcribe = db.subscribe;
const Place = db.place;
const Tour = db.tour;
const BookTour = db.bookTour;

const { Op } = db.Sequelize;
exports.countAll = async (req, res, next) => {
  var countSub = await Subcribe.count({ where: null });
  var countPlace = await Place.count({ where: null });
  var countTour = await Tour.count({ where: null });
  var countBook = await BookTour.count({ where: null });

  var item = {
    countSub: countSub,
    countPlace: countPlace,
    countTour: countTour,
    countBook: countBook,
  };
  res.json(item);
};
