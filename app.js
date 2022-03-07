var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//CORS module 
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//The dependencies of the Metur app 
var pointCloud = require('./routes/pointcloud')
var forgeViewerMetur = require('./routes/forgeviewer/forgeviewermetur')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//CORS for yandex cloud storage
/*
app.use(
  cors({
    //origin: '*',
    origin: 'https://storage.yandexcloud.net/potreeclouds/metur20mm/cloud.js',
    origin: 'http://127.0.0.1:3021',

  })
)*/


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

//The routes of the Metur app 
app.use('/pointcloud', pointCloud);
app.use('/forgeViewerMetur', forgeViewerMetur)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
