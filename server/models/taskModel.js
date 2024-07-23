const { DataTypes } = require('sequelize');
const db = require('../config/db');

// Define the Task model
const Task = db.define('Task', {
    task_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    task_details: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    issued_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    issued_by: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    assigned_to: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    division: {
        type: DataTypes.STRING,
        allowNull: false
    },
    issuer_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company_tag: {
        type: DataTypes.STRING(6),
        allowNull: false
    }
}, {
    tableName: 'tasks',
    timestamps: false
});

// Sync the model with the database (without alter option)
Task.sync({ alter: false, force: false })
    .then(() => console.log('Task table created successfully or already exists'))
    .catch(err => console.log('Error creating Task table:', err));

module.exports = Task;
