const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mysupermarketdb"
});

db.connect(
    (err) => {
        if (err) {
            throw err;
        }

        console.log("Connect - SQL :)");
    }
);

module.exports = db;