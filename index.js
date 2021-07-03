const express = require('express');
const app = express();
const con = require("./db/connection");
// const bodyParser = require('body-parser');
const jpv = require('jpv');
const login = require("./models/login")
// app.use(bodyParser.json());
app.use(express.json());

app.get("/students", function (req, res, next) {

    let sql = 'select * from login ';
    if (Object.keys(req.body).length > 0) {
        sql += ' where email_id="' + req.body.email_id + '"';
    }
    con.query(sql, (err, data) => {
        if (err) {
            res.status(500).send({ 'error': 'error' });
        }
        res.json(data);
    });
});

app.post("/students", (req, res, next) => {
    let sql = 'insert into login (email_id,password) values ("' + req.body.email_id + '","' + req.body.password + '")';
    con.query(sql, (err, data) => {
        if (err) {
            res.status(500).send({ 'error': 'error' });
        }
        res.json({ "insertId": data.insertId });
    });
});

app.patch("/students", (req, res) => {
    res.send("update some fields from table");
});

app.put("/students", (req, res) => {
    if (typeof req.body == "undefined") {
        res.status(500).send({ 'error': 'error' });
        return false;
    }
    console.log("req.body");

    let sql = 'update login set password="' + req.body.password + '" where email_id="' + req.body.email_id + '"';
    con.query(sql, (err, data) => {
        if (err) {
            res.status(500).send({ 'error': 'error' });
        }
        res.json({ "updated_records": data.affectedRows });
    });
});

app.delete("/students", (req, res) => {
    let sql = 'delete from login where email_id="' + req.body.email_id + '"';
    con.query(sql, (err, data) => {
        if (err) {
            res.status(500).send({ 'error': 'error' });
        }
        res.json({ "deleted_records": data.affectedRows });
    });
});

app.listen(3000);