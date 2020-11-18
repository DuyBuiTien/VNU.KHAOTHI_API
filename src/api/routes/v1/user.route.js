const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/user.controller');
const { authorize, LOGGED_USER, ADMIN } = require('../../middlewares/auth');
const { listUsers, updateUser, updatePassword } = require('../../validations/user.validation');

const router = express.Router();

router.route('/GetUserInfo').get(authorize(), controller.GetUserInfo);
router.route('/ListUser').get(authorize(), controller.ListUser);
router.route('/UploadProfilePicture').post(authorize(), controller.UploadProfilePicture);

module.exports = router;
