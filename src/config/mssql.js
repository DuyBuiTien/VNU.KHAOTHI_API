const Sequelize = require('sequelize');
const { sqlconfig, env } = require('./vars');

const sequelize = new Sequelize(sqlconfig.database, sqlconfig.user, sqlconfig.password, {
  host: sqlconfig.server,
  port: sqlconfig.port,
  dialect: 'mssql',
  timezone: '+07:00',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.attachment = require('../api/models/attachment.model')(sequelize, Sequelize);

module.exports = db;
