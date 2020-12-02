const { DataTypes, Sequelize, Model } = require('sequelize');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
    class TourDetailDescription extends Model {
    }

    TourDetailDescription.init(
        {
            title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            contentData: {
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
            modelName: 'TourDetailsDescriptions',
            freezeTableName: true,
        },
    );

    return TourDetailDescription;
};
