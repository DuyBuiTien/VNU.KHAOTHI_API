const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/subcribe.controller');
const { authorize, LOGGED_USER, ADMIN } = require('../../middlewares/auth');
const { listUsers, updateUser, updatePassword } = require('../../validations/user.validation');

const router = express.Router();

router.route('/GetListSubcriber').get(controller.GetListSubcriber);

module.exports = router;
