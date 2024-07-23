const { DataTypes } = require('sequelize');
const db = require('../config/db');

// Define the Attendance model
const Attendance = db.define('Attendance', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    clock_in: {
        type: DataTypes.TIME,
        allowNull: true
    },
    clock_out: {
        type: DataTypes.TIME,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'attendance',
    timestamps: false
});

// Sync the model with the database (without alter option)
Attendance.sync({ alter: false, force: false })
    .then(() => console.log('Attendance table created successfully or already exists'))
    .catch(err => console.log('Error creating Attendance table:', err));

module.exports = Attendance;
