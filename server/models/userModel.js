const { DataTypes } = require('sequelize');
const db = require('../config/db');

// Define the User model
const User = db.define('User', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tasks_list: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    clock_in: {
        type: DataTypes.TIME,
        allowNull: true
    },
    clock_out: {
        type: DataTypes.TIME,
        allowNull: true
    },
    division: {
        type: DataTypes.STRING,
        allowNull: false
    },
    division_role: {
        type: DataTypes.ENUM('head', 'member'),
        allowNull: false,
        defaultValue: 'member'
    },
    role: {
        type: DataTypes.ENUM('ceo', 'employee'),
        allowNull: false,
        defaultValue: 'employee'
    },
    company_tag: {
        type: DataTypes.STRING(6),
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'users',
    timestamps: false
});

// Sync the model with the database (without alter option)
User.sync({ alter: false, force: false })
    .then(() => console.log('User table created successfully or already exists'))
    .catch(err => console.log('Error creating User table:', err));

module.exports = User;
