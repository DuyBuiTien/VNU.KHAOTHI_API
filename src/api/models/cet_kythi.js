const { DataTypes, Sequelize, Model } = require('sequelize');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
    class Cet_Kythi extends Model {
    }

    Cet_Kythi.init(
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            MaKythi: {
                type: DataTypes.TEXT
            },
            TenKythi: {
                type: DataTypes.TEXT
            },
            Mota: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Tungay: {
                type: DataTypes.DATE,
                allowNull: true
            },
            Toingay: {
                type: DataTypes.DATE,
                allowNull: true
            },
            Socathi: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            Handangky: {
                type: DataTypes.DATE,
                allowNull: true
            },
            Trangthai: {
                type: DataTypes.INTEGER
            },
            Taocathi: {
                type: DataTypes.INTEGER
            },
            Anhkythi: {
                type: DataTypes.TEXT
            }
        },
        {
            sequelize,
            modelName: 'Cet_Kythi',
            freezeTableName: true,
        },
    );

    return Cet_Kythi;
};
