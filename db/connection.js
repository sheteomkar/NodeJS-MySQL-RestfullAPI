const mysql = require('mysql');
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydb"
});

// connect to database
con.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("conneceted");
});

module.exports = con;