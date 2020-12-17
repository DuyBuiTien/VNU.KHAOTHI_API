const express = require('express');
const { validate } = require('express-validation');
const controller = require('../../controllers/emailTemplate.controller');
const { authorize, LOGGED_USER, ADMIN } = require('../../middlewares/auth');
const { listUsers, updateUser, updatePassword } = require('../../validations/user.validation');

const router = express.Router();

router.route('/').get(controller.findAll).post(controller.create);
router.route('/:id').put(controller.update).delete(controller.remove);
module.exports = router;
