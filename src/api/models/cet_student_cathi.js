const { DataTypes, Sequelize, Model } = require('sequelize');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
    class Cet_Student_Cathi extends Model {
    }

    Cet_Student_Cathi.init(
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            Makythi: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Madiemthi: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Mamonthi: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Cathi: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            checked: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            },
        },
        {
            sequelize,
            modelName: 'Cet_Student_Cathi',
            freezeTableName: true,
        },
    );

    return Cet_Student_Cathi;
};
