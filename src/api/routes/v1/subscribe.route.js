const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/subcribe.controller');
const { authorize, LOGGED_USER, ADMIN } = require('../../middlewares/auth');
const { listUsers, updateUser, updatePassword } = require('../../validations/user.validation');

const router = express.Router();

router.route('/').get(controller.findAll).post(controller.create).delete(controller.remove);
router.route('/:id').patch(controller.update);
router.route('/sendEmail').post(controller.sendEmail);
module.exports = router;
