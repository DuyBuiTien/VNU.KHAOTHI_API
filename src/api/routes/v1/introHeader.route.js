const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/intro.controller');
const { authorize, LOGGED_USER, ADMIN } = require('../../middlewares/auth');
const { listUsers, updateUser, updatePassword } = require('../../validations/user.validation');

const router = express.Router();
router.route('/imagesheader').put(controller.updateImage).get(controller.findAllImages);
module.exports = router;
