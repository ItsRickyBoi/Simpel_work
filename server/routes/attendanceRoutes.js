const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');

router.get('/:userId', attendanceController.getAttendanceByUserId);
router.post('/clockin', attendanceController.clockIn);
router.put('/clockout', attendanceController.clockOut);

module.exports = router;
