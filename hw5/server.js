// import express from 'express'
var express = require('express');
var bodyParser = require('body-parser')
var sql = require('mysql')
var app = express();

app.use(express.static(__dirname))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

var con = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "CostaRicaNgu1944!",
    database: "hw5"
});

con.connect(function(err) {
    if (err) {
        console.log("Error when connect to database: " + err);
    } else {
        console.log("Connect successful!")
    }
})

app.listen(8080, function() {
    console.log("Server running")
})

app.get('/css/style.css', function(req, res){
    console.log("css")
    res.sendFile('/public/css/style.css', {root: __dirname});
});

app.get('/js/get_actions.js', function(req, res){
    console.log("js")
    res.sendFile('/public/js/get_actions.js', {root: __dirname});
});

app.get('/home', function(req, res){
    console.log("Homepage")
    res.sendFile('/public/14220085_HW5.html', {root: __dirname});
});


app.post('/tablestu', function(req, res) {

    console.log(req.body)

    con.query('SELECT studentid, firstname, lastname, birthdate, major FROM STUDENT',

        function(err,rows,fields) {

            if (err) {
                console.log('Error during query processing STUDENT table');
            } else {
                console.log('Here is the result : ', rows);

                res.send(rows);
                res.end();
            }
    });
})

app.post('/tablegra', function(req, res) {

    con.query('SELECT * FROM GRADES',

        function(err,rows,fields) {

            if (err) {
                console.log('Error during query processing GRADE table');
            } else {
                console.log('Here is the result : ', rows);

                res.send(rows);
                res.end();
            }
    });
})

app.post('/tablecour', function(req, res) {

    con.query('SELECT courseid, description FROM COURSE',

        function(err,rows,fields) {

            if (err) {
                console.log('Error during query processing COURSE table');
            } else {
                console.log('Here is the result : ', rows);

                res.send(rows);
                res.end();
            }
    });
});

app.post('/getstudent', function(req, res) {

    var studentid = req.body.id;
    var termid = req.body.term;

    console.log(termid)

    con.query('SELECT student.studentid, student.firstname, student.lastname, ' +
        'course.courseid, course.description, ' +
        'grades.courseid, grades.studentid, grades.term, grades.grade FROM STUDENT, COURSE, GRADES ' + 
        'WHERE student.studentid = ' + studentid + ' \
        AND grades.studentid = ' + studentid + ' \
        AND grades.term = "' + termid + '" \
        AND grades.courseid = course.courseid;',

        function(err,rows,fields) {

            if (err) {
                console.log('Error during query processing getStudent table ' + err);
            } else {
                console.log('Here is the result : ', rows);

                res.send(rows);
                res.end();
            }
    });
});

app.post('/liststu', function(req, res) {

    con.query('SELECT DISTINCT student.firstname FROM STUDENT',

        function(err,rows,fields) {

            if (err) {
                console.log('Error during query processing COURSE table '+ err);
            } else {
                console.log('Here is the result of list students : ', rows);

                res.send(rows);
                res.end();
            }
    });
});

app.post('/listterm', function(req, res) {

    con.query('SELECT DISTINCT grades.term FROM GRADES',

        function(err,rows,fields) {

            if (err) {
                console.log('Error during query processing TERMS table '+ err);
            } else {
                console.log('Here is the result of list terms : ', rows);

                res.send(rows);
                res.end();
            }
    });
});

app.post('/addstu', function(req, res) {

    var info = req.body;
    console.log(info);

    con.query('INSERT INTO STUDENT (firstname, lastname, birthdate, major) VALUES (?, ?, ?, ?);',
        [info.new_first, info.new_last, info.new_birth, info.new_major],
        function(err,rows,fields) {

            if (err) {
                console.log('Error during insertion STUDENT table' + err);
            } else {
                console.log('Add student success', rows.affectedRows);
                res.end();
            }
    });
});
