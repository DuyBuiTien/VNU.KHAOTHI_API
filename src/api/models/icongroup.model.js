const { DataTypes, Sequelize, Model } = require('sequelize');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
    class IconGroup extends Model {
    }

    IconGroup.init(
        {
            TieuDe: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ThuTu: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            SoCot: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            ClassBieuTuong: {
                type: DataTypes.STRING,
                allowNull: true
            },
            ClassMauBieuTuong: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            SuDung: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
            Ma: {
                type: DataTypes.STRING,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'NhomTienNghis',
            freezeTableName: true,
        },
    );

    return IconGroup;
};
