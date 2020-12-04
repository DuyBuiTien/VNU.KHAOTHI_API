const { DataTypes, Sequelize, Model } = require('sequelize');
const httpStatus = require('http-status');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const APIError = require('../utils/APIError');

module.exports = (sequelize, Sequelize) => {
    class ScheduleDetail extends Model {
        static async get(id) {
            try {
                const item = await ScheduleDetail.findByPk(id);

                if (item) {
                    return item;
                }

                throw new APIError({
                    message: 'Schedule detail does not exist',
                    status: httpStatus.NOT_FOUND,
                });
            } catch (error) {
                console.log(error);
                throw error;
            }
        }
    }

    ScheduleDetail.init(
        {
            contentData: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            tourDetail_id: {
                type: DataTypes.INTEGER,
                allowNull: true
            }
        },
        {
            sequelize,
            modelName: 'ScheduleDetails',
            freezeTableName: true,
        },
    );

    return ScheduleDetail;
};
