const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/tourDetail.controller');

const router = express.Router();

router.route('/').get(controller.findAll)
    .post(controller.create)

router.route('/:tour_id')
    .get(controller.findByTourDetailId)


router.route('/:tourDetail_id/:place_id')
    .patch(controller.update)
    .delete(controller.remove)

module.exports = router;
