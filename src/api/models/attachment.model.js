const { DataTypes, Sequelize, Model } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  class Attachment extends Model { }

  Attachment.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fileUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      path: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'attachment',
      freezeTableName: true,
    },
  );

  return Attachment;
};
