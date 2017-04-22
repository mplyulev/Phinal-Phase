var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require("express-session");
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var monk = require('monk');

var router = express.Router();


var uri = "mongodb://al_n:phinalphase123@phinalphase-shard-00-00-h6f3e.mongodb.net:27017,phinalphase-shard-00-01-h6f3e.mongodb.net:27017,phinalphase-shard-00-02-h6f3e.mongodb.net:27017/PhinalPhase?ssl=true&replicaSet=PhinalPhase-shard-0&authSource=admin";
MongoClient.connect(uri, function (err, database) {
    db = database;
    database.close();
});
  db = monk(uri);

 

 var app = express();
app.use(function(req, res, next) {
    req.db = db;
    next();
});


 

//routes
var login = require('./routes/login');
var registration = require('./routes/registration');
var index = require('./routes/index');
var users = require('./routes/users');
var pp = require('./routes/pp');


var app = express();
var server = require('http').Server(app);
var socket = require('./socketServer');

socket.getSocket(server);





app.use(function (req, res, next) {
    req.db = db;
    next();
});

// app.set('port', (process.env.PORT || 8080));

server.listen(5000, function () {
    console.log('Listening on ' + server.address().port);
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ secret: "phinalphase1234" }));
app.use(router);
app.use(express.static(path.join(__dirname, 'public')));
 



function requireLogin (req, res, next)  {
    if (req.session.userId != undefined) {
          next();       
    }
    else  {
         res.redirect('/login');
    }
}

app.use('/pp', pp);
app.use('/login', login);
app.use('/registration', registration);
app.use('/',requireLogin, index);
app.use('/index',requireLogin, index);
app.use("/login#/changePassword",requireLogin);
app.use('/users', users);




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// app.listen(app.get('port'), function() {
//     console.log('Node app is running on port', app.get('port'));
// });

module.exports = app;