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
  logging: false
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Student_Infos = require('../api/models/cet_student_info')(sequelize, Sequelize);
db.Dangkythi_Lephis = require('../api/models/cet_dangkythi_lephi')(sequelize, Sequelize);
db.Diemthi_Cathis = require('../api/models/cet_diemthi_cathi')(sequelize, Sequelize);
db.Kythi_Cathis = require('../api/models/cet_kythi_cathi')(sequelize, Sequelize);
db.Kythi_Diadiems = require('../api/models/cet_kythi_diadiem')(sequelize, Sequelize);
db.Kythi_Monthis = require('../api/models/cet_kythi_monthi')(sequelize, Sequelize);
db.Kythis = require('../api/models/cet_kythi')(sequelize, Sequelize);
db.Mon_Cathis = require('../api/models/cet_mon_cathi')(sequelize, Sequelize);
db.Student_Accs = require('../api/models/cet_student_acc')(sequelize, Sequelize);
db.Student_Cathis = require('../api/models/cet_student_cathi')(sequelize, Sequelize);
db.Notifications = require('../api/models/notification.model')(sequelize, Sequelize);

const Student_Info = db.Student_Infos
const Dangkythi_Lephi = db.Dangkythi_Lephis;
const Diemthi_Cathi = db.Diemthi_Cathis;
const Kythi_Cathi = db.Kythi_Cathis;
const Kythi_Diadiem = db.Kythi_Diadiems;
const Kythi_Monthi = db.Kythi_Monthis;
const Kythi = db.Kythis;
const Mon_Cathi = db.Mon_Cathis;
const Student_Acc = db.Student_Accs;
const Student_Cathis = db.Student_Cathi;
const Notification = db.Notifications;

module.exports = db;
