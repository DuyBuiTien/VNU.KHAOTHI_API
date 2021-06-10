const { DataTypes, Sequelize, Model } = require('sequelize');
const jwt = require('jwt-simple');
const moment = require('moment-timezone');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const db = require('../../config/mssql');
const { Student_Accs } = db;
const APIError = require('../utils/APIError');

const fieldDefault = ['Id', 'Username', 'Email', 'FullName', 'AvatarUrl', 'Name', 'Address'];

module.exports = (sequelize, Sequelize) => {
    class Cet_Student_Acc extends Model {

        async passwordMatches(Password) {
            return await bcrypt.compare(Password, this.password);
        }
        transform() {
            const transformed = {};
            const fields = fieldDefault;

            fields.forEach((field) => {
                transformed[field] = this[field];
            });

            return transformed;
        }

        token() {
            const playload = {
                exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
                iat: moment().unix(),
                sub: this.tendangnhap,
                context: {
                    user: {
                        tendangnhap: this.tendangnhap,
                        Email: this.Email,
                    },
                },
            };
            return jwt.encode(playload, jwtSecret);
        }

        static async get(Id) {
            try {
                const user = await Student_Accs.findByPk(Id, {
                    attributes: fieldDefault,
                });

                if (user) {
                    return user;
                }

                throw new APIError({
                    message: 'User does not exist',
                    status: httpStatus.NOT_FOUND,
                });
            } catch (error) {
                throw error;
            }
        }
    }


    Cet_Student_Acc.init(
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            tendangnhap: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            Hoten: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Sodienthoai: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Email: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            Trangthai: {
                type: DataTypes.INTEGER,
                allowNull: true
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            verify: {
                type: DataTypes.BOOLEAN,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'Cet_Student_Acc',
            freezeTableName: true,
        },
    );

    return Cet_Student_Acc;
};
