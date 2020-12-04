const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/icon.controller');

const router = express.Router();

router.route('/').get(controller.findAll)
    .post(controller.create)

router.route('/:NhomTienNghiID')
    .get(controller.findByIconGroupId)


router.route('/:id')
    .patch(controller.update)
    .delete(controller.remove)

module.exports = router;
