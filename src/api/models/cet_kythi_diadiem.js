const { DataTypes, Sequelize, Model } = require('sequelize');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
    class Cet_Kythi_Diadiem extends Model {
    }

    Cet_Kythi_Diadiem.init(
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Makythi: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Madiadiem: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Ghichu: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'Cet_Kythi_Diadiem',
            freezeTableName: true,
        },
    );

    return Cet_Kythi_Diadiem;
};
