var express = require('express');
var session = require('express-session');

var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var config = require('./config');

app = require('express')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Models hook in
app.models = {
  // accountModel: require('./mongo/models/Accounts')()
};

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session handling
app.use(session({ secret: config.session_secret }))

app.use('/', index);
app.use('/users', users);

var mongoDb = require('./mongo/helpers/mongodb');
mongoDb.dbConnection();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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


// IMPORT PASSWORDS - ZXCVBN
// UNCOMMENT the following for the insertion of zxcvbn passwords

// let zxcvbnPasswords = require('./mongo/controllers/zxcvbnPasswords');
// let passwordConverter = require('./helpers/passwordConverter');

// console.log("hello")
// passwordConverter.convertPasswordsToJSON('./passwords/linkedin_password_leak_stats.csv')
// .then(passwords => {
//   zxcvbnPasswords.insertPasswords(passwords)
//   .then(() =>{
//     console.log("Passwords inserted successfully")
//   })
// }).catch(error => {
//   console.log(error)
// })

module.exports = app;
