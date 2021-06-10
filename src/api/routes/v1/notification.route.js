const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/notification.controller');

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


module.exports = router;
