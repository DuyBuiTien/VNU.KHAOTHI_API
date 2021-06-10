const express = require('express');
const router = express.Router();

const authRoutes = require('./auth.route');
const StudentAccRoutes = require('./student_acc.route');
const dangkythiLephiRoutes = require('./dangkythi_lephi.route');
const diemthiCathiRoutes = require('./diemthi_cathi.route');
const kythiCathiRoutes = require('./kythi_cathi.route');
const kythiMonthiRoutes = require('./kythi_monthi.route');
const kythiRoutes = require('./kythi.route');
const monCathiRoutes = require('./mon_cathi.route');
const studentCathiRoutes = require('./student_cathi.route');
const studentInfoRoutes = require('./student_info.route');
const notificationRoutes = require('./notification.route')

/**
 * GET v1/status
 */
router.get('/status', (req, res) => res.send('OK'));

/**
 * GET v1/docs
 */
router.use('/auth', authRoutes)
router.use('/student-acc', StudentAccRoutes);
router.use('/dangkythi-lephi', dangkythiLephiRoutes);
router.use('/diemthi-cathi', diemthiCathiRoutes);
router.use('/kythi-cathi', kythiCathiRoutes);
router.use('/kythi-monthi', kythiMonthiRoutes);
router.use('/kythi', kythiRoutes);
router.use('/mon-cathi', monCathiRoutes);
router.use('/student-cathi', studentCathiRoutes);
router.use('/student-info', studentInfoRoutes);
router.use('/notification', notificationRoutes)
module.exports = router;
