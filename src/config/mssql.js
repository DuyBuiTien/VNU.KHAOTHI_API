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

db.users = require('../api/models/user.model')(sequelize, Sequelize);
db.positions = require('../api/models/position.model')(sequelize, Sequelize);
db.offices = require('../api/models/office.model')(sequelize, Sequelize);
db.passwordResetTokens = require('../api/models/passwordResetToken.model')(sequelize, Sequelize);
db.refreshTokens = require('../api/models/refreshToken.model')(sequelize, Sequelize);

db.roles = require('../api/models/role.model')(sequelize, Sequelize);
db.permissions = require('../api/models/permission.model')(sequelize, Sequelize);
db.role_permission = require('../api/models/role_permission.model')(sequelize, Sequelize);

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


const User = db.users;
const Position = db.positions;
const Office = db.offices;
const Role = db.roles;
const Permission = db.permissions;
const Attachment = db.attachment;
const Subcribe = db.subcribe;
const Place = db.place;
const ScheduleDetail = db.scheduleDetail;
const Tour = db.tour;
const Intro = db.intro;
const BookTour = db.bookTour;
const Image = db.image;


Position.hasMany(User, { as: 'users' });
User.belongsTo(Position, {
  foreignKey: 'positionId',
  as: 'position',
});

Office.hasMany(Office, { as: 'offices' });
Office.belongsTo(Office, {
  foreignKey: 'parentId',
  as: 'office',
});

Office.hasMany(User, { as: 'users' });
User.belongsTo(Office, {
  foreignKey: 'officeId',
  as: 'office',
});

Office.hasMany(User, { as: 'nhoms' });
User.belongsTo(Office, {
  foreignKey: 'nhomId',
  as: 'nhom',
});

User.belongsToMany(Role, {
  through: 'user_role',
  as: 'roles',
  foreignKey: 'userId',
});

Role.belongsToMany(User, {
  through: 'user_role',
  as: 'users',
  foreignKey: 'roleId',
});

Permission.belongsToMany(Role, {
  through: 'role_permission',
  as: 'roles',
  foreignKey: 'permissionId',
});

Role.belongsToMany(Permission, {
  through: 'role_permission',
  as: 'permissions',
  foreignKey: 'roleId',
});

User.hasMany(Attachment, { as: 'attachments' });
Attachment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
});

module.exports = db;
