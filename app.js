var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongdb = require('./database/mongodb');
var cors = require('cors')

var mongoose = require('mongoose');
require('./models/settings');
require('./models/users');
require('./models/hashtags');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var whatsappRouter = require('./routes/whatsapp');
var hashtagsRouter = require('./routes/hashtags');
var accountRouter = require('./routes/account');


var verifyToken = require('./utils/jwt');

var adRouter = require('./routes/ads');

var app = express();


app.use(logger('dev'));
app.use(cors());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://hashad-web.herokuapp.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'uploads')));
app.all('*', verifyToken);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/whatsapp', whatsappRouter);
app.use('/ads', adRouter);
app.use('/hashtags', hashtagsRouter);
app.use('/account', accountRouter);







/*
XYexcz_3-@WqP/D*/

module.exports = app;
