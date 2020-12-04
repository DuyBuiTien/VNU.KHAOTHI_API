const { DataTypes, Sequelize, Model } = require('sequelize');
const jwt = require('jwt-simple');
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
  class Place extends Model {
    static async get(id) {
      try {
        const item = await Place.findByPk(id);

        if (item) {
          return item;
        }

        throw new APIError({
          message: 'Place does not exist',
          status: httpStatus.NOT_FOUND,
        });
      } catch (error) {
        console.log(error);
        throw error;
      }
    }
  }

  Place.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sumHotel: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isFeatured: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      placeOrder: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Place',
      freezeTableName: true,
    },
  );

  return Place;
};
