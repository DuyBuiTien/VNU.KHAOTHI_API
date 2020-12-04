const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/icongroup.controller');

const router = express.Router();

router.route('/').get(controller.findAll)

module.exports = router;
