const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Performance = db.define('Performance', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  daysOfWeek: {
    type: DataTypes.JSON, // Storing performance data for each day
    allowNull: true,
  },
}, {
  tableName: 'performance',
  timestamps: false,
});

module.exports = Performance;
