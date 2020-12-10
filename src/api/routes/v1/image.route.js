const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/image.controller');
const { authorize, LOGGED_USER, ADMIN } = require('../../middlewares/auth');
const { listUsers, updateUser, updatePassword } = require('../../validations/user.validation');

const router = express.Router();

router
    .route('/')
    .get(controller.findAll)
    .post(controller.create)
    .put(controller.update)
    .delete(controller.remove)

router.route('/tour/:tourDetail_id')
    .get(controller.findByTourDetailId)

router.route('/place/:place_id')
    .get(controller.findByPlaceId)

router.route('/photos').post(controller.addPhotos);
module.exports = router;
