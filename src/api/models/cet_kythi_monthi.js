const { DataTypes, Sequelize, Model } = require('sequelize');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
    class Cet_Kythi_Monthi extends Model {
    }

    Cet_Kythi_Monthi.init(
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Makythi: {
                type: DataTypes.TEXT
            },
            MaMonthi: {
                type: DataTypes.TEXT
            },
            Giothi: {
                type: DataTypes.DATE,
                allowNull: true
            },
            Ngaythi: {
                type: DataTypes.DATE,
                allowNull: true
            },
            Diadiemthi: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Lephithi: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            Thoigianlambai: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            Luachon: {
                type: DataTypes.INTEGER
            }
        },
        {
            sequelize,
            modelName: 'Cet_Kythi_Monthi',
            freezeTableName: true,
        },
    );

    return Cet_Kythi_Monthi;
};
