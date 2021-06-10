const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/student_cathi.controller');

const router = express.Router();

/**
 * Load user when API with userId route parameter is hit
 */

router
    .route('/')
    // tìm kiếm
    .get(controller.findAll)
    // tạo mới
    .post(controller.create);

router
    .route('/:Id')
    // lấy thông tin
    .get(controller.findOne)
    // sửa thông tin
    .patch(controller.update)
    // xóa thông tin
    .delete(controller.remove);

module.exports = router;
