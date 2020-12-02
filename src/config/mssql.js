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

db.subcribe = require('../api/models/subcribe.model')(sequelize, Sequelize);
db.place = require('../api/models/place.model')(sequelize, Sequelize);
db.scheduleDetail = require('../api/models/scheduleDetail.model')(sequelize, Sequelize)
db.service = require('../api/models/service.model')(sequelize, Sequelize)
db.tourDetailDescription = require('../api/models/tourDetailDescription.model')(sequelize, Sequelize)
db.tour = require('../api/models/tour.model')(sequelize, Sequelize);
db.intro = require('../api/models/intro.model')(sequelize, Sequelize);
db.bookTour = require('../api/models/bookTour.model')(sequelize, Sequelize);
db.image = require('../api/models/image.model')(sequelize, Sequelize);


module.exports = db;
