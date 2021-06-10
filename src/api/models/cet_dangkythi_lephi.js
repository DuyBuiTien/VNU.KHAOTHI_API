const { DataTypes, Sequelize, Model } = require('sequelize');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
    class Cet_Dangkythi_Lephi extends Model {
    }

    Cet_Dangkythi_Lephi.init(
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,

            },
            username: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            Makythi: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Diemthi: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Lephidangky: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            Lephidanop: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            Lephichuyen: {
                type: DataTypes.FLOAT,
                allowNull: true
            },
            Nguoithu: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Ngaythu: {
                type: DataTypes.DATE,
                allowNull: true
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            Ngaydangky: {
                type: DataTypes.DATE,
                allowNull: true
            },
            Codedangky: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            bill4gateway: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'Cet_Dangkythi_Lephi',
            freezeTableName: true,
        },
    );

    return Cet_Dangkythi_Lephi;
};
