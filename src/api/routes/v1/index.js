const express = require('express');
const authRoutes = require('./auth.route');
const userRoutes = require('./user.route');
const roleRoutes = require('./role.route');
const permissionRoutes = require('./permission.route');
const officeRoutes = require('./office.route');
const positionRoutes = require('./position.route');
const subcribeRoutes = require('./subcribe.route');
const placeRoutes = require('./place.route');
const tourRoutes = require('./tour.route');
const introRoutes = require('./intro.route');
const bookTourRoutes = require('./bookTour.route');
const imageRoutes = require('./image.route');
const attachmentRoutes = require('./attachment.route');


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
router.use('/subcribe', subcribeRoutes);
router.use('/place', placeRoutes);
router.use('/tour', tourRoutes);
router.use('/intro', introRoutes);
router.use('/bookTour', bookTourRoutes);
router.use('/image', imageRoutes);
router.use('/attachment', attachmentRoutes);

module.exports = router;
