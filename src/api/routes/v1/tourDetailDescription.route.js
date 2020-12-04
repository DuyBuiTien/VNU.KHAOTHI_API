const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/tourDetailDescription.controller');

const router = express.Router();

router.route('/').get(controller.findAll)
    .post(controller.create)

router.route('/:tourDetail_id')
    .get(controller.findByTourDetailId)

router.route('/:id')
    .patch(controller.update)
    .delete(controller.remove)

module.exports = router;
