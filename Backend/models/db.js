const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: '3308',
    password: process.env.PASSWORD,
    database: 'shopping'
})


module.exports = db;
