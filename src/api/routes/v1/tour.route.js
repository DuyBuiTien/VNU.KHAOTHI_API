const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/tour.controller');

const router = express.Router();

router.route('/').get(controller.findAll)
    .post(controller.create)

router.route('/featured')
    .get(controller.findAllFeatured)

router.route('/tag')
    .get(controller.findAllTag)

router.route('/:id')
    .get(controller.findOne)
    .put(controller.update)
    .delete(controller.remove)

module.exports = router;
