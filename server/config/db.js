const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mariadb',
    pool: {
        max: 10,  // Increase the pool size
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false  // Disable logging; can be true or a funct  ion
});

module.exports = db;
