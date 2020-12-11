const { DataTypes, Sequelize, Model } = require('sequelize');
const jwt = require('jwt-simple');
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
  class BookTour extends Model {
    static async get(id) {
      try {
        const item = await BookTour.findByPk(id);

        if (item) {
          return item;
        }

        throw new APIError({
          message: 'Office does not exist',
          status: httpStatus.NOT_FOUND,
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }

  BookTour.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      specialRequirement: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tourCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tour_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      favoritePlace: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      dateStart: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      dateEnd: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      sumPeople: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sumChildren5to12: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      sumChildrenUnder5: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'BookTour',
      freezeTableName: true,
    },
  );

  return BookTour;
};
