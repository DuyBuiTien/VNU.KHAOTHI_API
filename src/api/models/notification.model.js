const { DataTypes, Sequelize, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class Notification extends Model { }

  Notification.init(
    {
      Id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      message: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'notification',
      freezeTableName: true,
    },
  );

  return Notification;
};
