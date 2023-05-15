const mysql = require('mysql');

const dbConnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'don2to3#@23',
    database: 'kanban',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Connecting to database
dbConnect.connect(function (err) {
    err ? console.log("Error in the connection" + err) : console.log(`Database Connected`);
});

module.exports = dbConnect;
