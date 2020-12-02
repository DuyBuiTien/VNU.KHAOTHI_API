const { DataTypes, Sequelize, Model } = require('sequelize');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
    class Service extends Model {
    }

    Service.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            icon: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            tourDetail_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'Services',
            freezeTableName: true,
        },
    );

    return Service;
};
