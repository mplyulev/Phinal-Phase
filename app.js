var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var monk = require('monk');

var db;
var uri = "mongodb://al_n:phinalphase123@phinalphase-shard-00-00-h6f3e.mongodb.net:27017,phinalphase-shard-00-01-h6f3e.mongodb.net:27017,phinalphase-shard-00-02-h6f3e.mongodb.net:27017/PhinalPhase?ssl=true&replicaSet=PhinalPhase-shard-0&authSource=admin";
MongoClient.connect(uri, function(err, database) {
    db = database;
    database.close();
});



var index = require('./routes/index');
var users = require('./routes/users');
var pp = require('./routes/pp');

var app = express();

app.set('port', (process.env.PORT || 5000));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    req.db = db;
    next();
});

app.use('/', index);
app.use('/users', users);
app.use('/pp', pp);

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

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});

module.exports = app;