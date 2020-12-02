const express = require('express');
const subcribeRoutes = require('./subcribe.route');
const placeRoutes = require('./place.route');
const scheduleDetailRoutes = require('./scheduleDetail.route');
const serviceRoutes = require('./service.route');
const tourDetailDescriptionRoutes = require('./tourDetailDescription.route')
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
router.use('/subcribe', subcribeRoutes);
router.use('/place', placeRoutes);
router.use('/scheduleDetail', scheduleDetailRoutes);
router.use('/service', serviceRoutes);
router.use('/tourDetailDescription', tourDetailDescriptionRoutes)
router.use('/tour', tourRoutes);
router.use('/intro', introRoutes);
router.use('/bookTour', bookTourRoutes);
router.use('/image', imageRoutes);
router.use('/attachment', attachmentRoutes);

module.exports = router;
