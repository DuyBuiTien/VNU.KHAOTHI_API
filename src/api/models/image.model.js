const { DataTypes, Sequelize, Model } = require('sequelize');
const jwt = require('jwt-simple');
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
  class Image extends Model {
    static async get(id) {
        try {
          const item = await Image.findByPk(id);
  
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

  Image.init(
    {
      uid: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      tourDetail_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      place_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Image',
      freezeTableName: true,
    },
  );

  return Image;
};
