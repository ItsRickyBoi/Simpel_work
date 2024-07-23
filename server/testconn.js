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
    logging: false
});

(async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    } finally {
        await db.close(); // Ensure to close the connection pool after testing
    }
})();
