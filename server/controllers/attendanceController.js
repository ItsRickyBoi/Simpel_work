const Attendance = require('../models/attendanceModel');

// Get attendance by user ID
exports.getAttendanceByUserId = async (req, res) => {
    try {
        const attendance = await Attendance.findAll({
            where: {
                user_id: req.params.userId
            },
            order: [['date', 'DESC']] // Order by date descending
        });
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching attendance', error });
    }
};

// Clock in the user
exports.clockIn = async (req, res) => {
    const { user_id, clock_in, date } = req.body;
    try {
        const existingAttendance = await Attendance.findOne({ where: { user_id, date } });
        if (existingAttendance) {
            await existingAttendance.update({ clock_in });
            res.status(200).json({ message: 'Clock-in time updated successfully' });
        } else {
            await Attendance.create({ user_id, clock_in, date });
            res.status(201).json({ message: 'Clock-in time recorded successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error recording clock-in', error });
    }
};

// Clock out the user
exports.clockOut = async (req, res) => {
    const { user_id, clock_out, date } = req.body;
    try {
        const existingAttendance = await Attendance.findOne({ where: { user_id, date } });
        if (existingAttendance) {
            await existingAttendance.update({ clock_out });
            res.status(200).json({ message: 'Clock-out time updated successfully' });
        } else {
            res.status(404).json({ message: 'Attendance record not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error recording clock-out', error });
    }
};
