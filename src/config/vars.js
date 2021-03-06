require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationInterval: process.env.JWT_EXPIRATION_MINUTES,
  mongo: {
    uri: process.env.NODE_ENV === 'test' ? process.env.MONGO_URI_TESTS : process.env.MONGO_URI,
  },

  sqlconfig: {
    server: process.env.SQL_SERVER,
    port: process.env.SQL_PORT,
    database: process.env.SQL_DATABASE,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    options: {
      encrypt: process.env.sqlEncrypt,
    },
  },

  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  emailConfig: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    username: process.env.EMAIL_USERNAME,
    password: process.env.EMAIL_PASSWORD,
  },
  avatarDirectory: process.env.AVATAR_DIRECTORY,
  avatarTypes: ['image/png', 'image/jpg', 'image/jpeg'],
  avatarLimitSize: 52428800, // 1mb
  photoDirectory: process.env.PHOTOS_DIRECTORY,
  photoTypes: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
  photoLimitSize: 52428800,
  fileDirectory: process.env.FILES_DIRECTORY,
  fileLimitSize: 52428800,
  // fileTypes: ["image/png", "image/jpg", "image/jpeg"],

  staticUrl: process.env.STATIC_URL,

  firebase_service_accout_key_Path: process.env.FIREBASE_SERVICE_ACCOUNT_KEY_PATH,
  firebase_service_url: process.env.FIREBASE_SERVICE_URL,
};
