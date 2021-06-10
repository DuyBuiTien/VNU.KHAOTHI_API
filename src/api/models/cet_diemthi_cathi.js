const { DataTypes, Sequelize, Model } = require('sequelize');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
    class Cet_Diemthi_Cathi extends Model {
    }

    Cet_Diemthi_Cathi.init(
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
            Madiemthi: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Cathi: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            checked: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'Cet_Diemthi_Cathi',
            freezeTableName: true,
        },
    );

    return Cet_Diemthi_Cathi;
};
