const express = require('express');
const subscribeRoutes = require('./subscribe.route');
const placeRoutes = require('./place.route');
const scheduleDetailRoutes = require('./scheduleDetail.route');
const serviceRoutes = require('./service.route');
const tourDetailDescriptionRoutes = require('./tourDetailDescription.route');
const tourRoutes = require('./tour.route');
const introRoutes = require('./intro.route');
const bookTourRoutes = require('./bookTour.route');
const imageRoutes = require('./image.route');
const attachmentRoutes = require('./attachment.route');
const ruleRoutes = require('./rule.route');
const tourDetailRoutes = require('./tourDetail.route');
const iconGroupRoutes = require('./icongroup.route');
const iconRoutes = require('./icon.route');
const policyRoutes = require('./policy.route');
const dashboardRoutes = require('./dashboard.route');
const userRoutes = require('./user.route');
const homeRoutes = require('./home.route');
const introHeaderRoutes = require('./introHeader.route');
const emailTemplateRoutes = require('./emailTemplate.route');
const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/user', userRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/docs', express.static('docs'));
router.use('/subscribe', subscribeRoutes);
router.use('/place', placeRoutes);
router.use('/scheduleDetail', scheduleDetailRoutes);
router.use('/service', serviceRoutes);
router.use('/tourDetailDescription', tourDetailDescriptionRoutes);
router.use('/tour', tourRoutes);
router.use('/intro', introRoutes);
router.use('/bookTour', bookTourRoutes);
router.use('/image', imageRoutes);
router.use('/attachment', attachmentRoutes);
router.use('/rule', ruleRoutes);
router.use('/tourDetail', tourDetailRoutes);
router.use('/iconGroup', iconGroupRoutes);
router.use('/icon', iconRoutes);
router.use('/policy', policyRoutes);
router.use('/home', homeRoutes);
router.use('/introHeader', introHeaderRoutes);
router.use('/emailTemplate', emailTemplateRoutes);
module.exports = router;
