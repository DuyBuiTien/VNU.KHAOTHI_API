const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/place.controller');
const { authorize, LOGGED_USER, ADMIN } = require('../../middlewares/auth');
const { listUsers, updateUser, updatePassword } = require('../../validations/user.validation');

const router = express.Router();

router
  .route('/')
  //tìm kiếm
  .get(controller.findAll)
  //thêm mới
  .post(controller.create);
router
  .route('/:id')
  //chi tiết
  .get(controller.findOne)
  //cập nhật
  .put(controller.update)
  //xóa
  .delete(controller.remove)
  .patch(controller.updateItem);
router
  .route('/photos')
  //tìm kiếm
  .post(controller.addPhotos);
module.exports = router;
