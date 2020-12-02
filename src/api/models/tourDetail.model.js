const { DataTypes, Sequelize, Model } = require('sequelize');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
    class TourDetail extends Model {
    }

    TourDetail.init(
        {
            code: {
                type: DataTypes.STRING,
                allowNull: true
            },
            title: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            isFeatured: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            }, priceTour: {
                type: DataTypes.STRING,
                allowNull: true,
            }, phoneNumber: {
                type: DataTypes.STRING,
                allowNull: true,
            }, startFrom: {
                type: DataTypes.STRING,
                allowNull: true,
            }, period: {
                type: DataTypes.STRING,
                allowNull: true,
            }, vehicle: {
                type: DataTypes.STRING,
                allowNull: true,
            }, createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
            }, updateAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            tour_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'TourDetails',
            freezeTableName: true,
        },
    );

    return TourDetail;
};
