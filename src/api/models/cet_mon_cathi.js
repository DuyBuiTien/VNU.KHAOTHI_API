const { DataTypes, Sequelize, Model } = require('sequelize');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
    class Cet_Mon_Cathi extends Model {
    }

    Cet_Mon_Cathi.init(
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            Makythi: {
                type: DataTypes.TEXT
            },
            Madiemthi: {
                type: DataTypes.TEXT
            },
            Mamonthi: {
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
            modelName: 'Cet_Mon_Cathi',
            freezeTableName: true,
        },
    );

    return Cet_Mon_Cathi;
};
