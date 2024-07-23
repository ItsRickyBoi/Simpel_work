// server/models/Attendance.js
const { DataTypes } = require('sequelize');
const db = require('../config/db');

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

module.exports = Attendance;
