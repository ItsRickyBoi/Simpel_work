const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Company = db.define('Company', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    company_tag: {
        type: DataTypes.STRING(6),
        allowNull: false,
        unique: true
    },
    company_address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    company_email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'companies',
    timestamps: false
});

Company.sync({ alter: false, force: false })
    .then(() => console.log('Company table created successfully or already exists'))
    .catch(err => console.log('Error creating Company table:', err));

module.exports = Company;
