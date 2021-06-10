const httpStatus = require('http-status');
const { omit } = require('lodash');
const admin = require('firebase-admin');
const db = require('../../config/mssql');

const { Notifications } = db;

const { firebase_service_accout_key_Path, firebase_service_url } = require('../../config/vars');

const serviceAccount = require(firebase_service_accout_key_Path);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebase_service_url,
});

const { Op } = db.Sequelize;

exports.findAll = async (req, res, next) => {

  Notifications.findAll()
    .then((results) => res.json(results))
    .catch((e) => next(e));
};

exports.sendtoTopicLocal = async (data) => {
  try {
    let messages = {
      data: data.data,
      notification: data.notification,
      topic: data.topic,
    }
    const result = await admin
      .messaging()
      .send(messages)
      .then((response) => response)
      .catch((error) => next(error));
    return result;
  } catch (error) {
    return error;
  }
};

exports.create = async (req, res, next) => {
  try {
    const itemData = omit(req.body, 'Id');

    const item = await Notifications.create(itemData);

    res.status(httpStatus.CREATED);
    return res.json(item);
  } catch (error) {
    next(error);
  }
};