const { DataTypes, Sequelize, Model } = require('sequelize');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
    class Cet_Kythi_Cathi extends Model {
    }

    Cet_Kythi_Cathi.init(
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
            Cathi: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            Giothi: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Ngaythi: {
                type: DataTypes.DATE,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'Cet_Kythi_Cathi',
            freezeTableName: true,
        },
    );

    return Cet_Kythi_Cathi;
};
