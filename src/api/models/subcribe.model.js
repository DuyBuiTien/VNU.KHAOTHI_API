const { DataTypes, Sequelize, Model } = require('sequelize');
const jwt = require('jwt-simple');
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
  class Subcribe extends Model {
    static async get(id) {
        try {
          const item = await Office.findByPk(id);
  
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

  Subcribe.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Subcribe',
      freezeTableName: true,
    },
  );

  return Subcribe;
};
