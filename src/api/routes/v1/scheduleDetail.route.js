const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/scheduleDetail.controller');

const router = express.Router();

router.route('/')
    .get(controller.findAll)

router.route('/:tourDetail_id')
    .get(controller.findByTourDetailId)

router.route('/:id')
    .post(controller.create)
    .patch(controller.update)
    .delete(controller.remove)

module.exports = router;
