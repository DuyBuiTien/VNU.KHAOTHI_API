const { DataTypes, Sequelize, Model } = require('sequelize');
const jwt = require('jwt-simple');
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
  class Banner extends Model {
    static async get(id) {
      try {
        const item = await Banner.findByPk(id);

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

  Banner.init(
    {
      uid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isHome: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      isIntro: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Banner',
      freezeTableName: true,
    },
  );

  return Banner;
};
