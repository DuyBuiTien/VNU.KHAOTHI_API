const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/place.controller');
const { authorize, LOGGED_USER, ADMIN } = require('../../middlewares/auth');
const { listUsers, updateUser, updatePassword } = require('../../validations/user.validation');

const router = express.Router();

router.route('/GetListPlace').get(controller.GetListPlace);
router.route('/GetListPlaceFeatured').get(controller.GetListPlaceFeatured);

module.exports = router;
