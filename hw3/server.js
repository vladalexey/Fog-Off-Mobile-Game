// import express from 'express'
var express = require('express');
var bodyParser = require('body-parser')
var get_fac = require('./public/js/factorial')
var get_sum = require('./public/js/sum')
var app = express();

app.use(express.static(__dirname))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

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
    res.sendFile('/public/14220085_HW3.html', {root: __dirname});
});

app.post('/get_fac', function(req, res){
    console.log(req.body.num)
    var result = get_fac.return_fac(req.body.num)
    console.log(String(result))
    res.write(String(result))
    // res.sendFile('/public/14220085_HW3.html', {root: __dirname});
    res.end()
});

app.post('/get_sum', function(req, res){
    console.log(req.body.num)
    var result = get_sum.return_sum(req.body.num)
    res.write(String(result))
    // res.sendFile('/public/14220085_HW3.html', {root: __dirname});
    res.end()
});