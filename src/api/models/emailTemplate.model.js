const { DataTypes, Sequelize, Model } = require('sequelize');
const jwt = require('jwt-simple');
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
  class EmailTemplate extends Model {
    static async get(id) {
      try {
        const item = await EmailTemplate.findByPk(id);

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

  EmailTemplate.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      contentData: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isDefault: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      isConfirm: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      isSubscribe: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'EmailTemplate',
      freezeTableName: true,
    },
  );

  return EmailTemplate;
};
