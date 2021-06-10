const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/auth.controller');
const { login, refresh } = require('../../validations/auth.validation');

const router = express.Router();

router.route('/register').post(/* validate(register),  */ controller.register);

router.route('/login').post(controller.login);

router.route('/sendOTP').post(controller.sendOTP);

module.exports = router;
