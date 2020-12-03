const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/service.controller');

const router = express.Router();

router.route('/').get(controller.findAll);

router.route('/:tourDetail_id')
    .get(controller.findByTourDetailId)
    .patch(controller.update)
    .post(controller.create)
    .delete(controller.remove)

module.exports = router;
