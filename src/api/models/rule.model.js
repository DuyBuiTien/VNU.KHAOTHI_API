const { DataTypes, Sequelize, Model } = require('sequelize');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
    class Rule extends Model {
    }

    Rule.init(
        {
            title: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            contentData: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            tourDetail_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'Rule',
            freezeTableName: true,
        },
    );

    return Rule;
};
