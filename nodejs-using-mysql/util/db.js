const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    database: 'learn-node',
    user: 'root',
    password: '#1122phases'
});

module.exports = pool.promise();