const express = require('express');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const roleRoutes = require('./role.route');
const permissionRoutes = require('./permission.route');
const officeRoutes = require('./office.route');
const positionRoutes = require('./position.route');

const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'));
router.use('/role', roleRoutes);
router.use('/permission', permissionRoutes);
router.use('/office', officeRoutes);
router.use('/position', positionRoutes);
router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;
