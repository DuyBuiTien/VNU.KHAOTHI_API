const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/dasboard.controller');

const router = express.Router();

router.route('/countAll').get(controller.countAll);

module.exports = router;