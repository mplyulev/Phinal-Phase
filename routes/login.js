var express = require('express');
var router = express.Router();

var users = db.get('users');
router.post('/', function (req, res, next) {
    var usernameLogin = req.body.usernameLogin;
    var passwordLogin = req.body.key;
    users.find({ username: usernameLogin} ,{password: passwordLogin })
        .then(function (data) {
            if (data.length > 0) {
                console.log(data);
                req.session.userId = data[0]._id;
                res.redirect('/index');
            } 
            else {
                res.render('login', { message: 'Wrong username or password.' });
              
            }
        });
});
router.get('/', function (req, res, next) {
    if (req.session.userId)
        res.redirect('/index');
    else
        res.render('login');
});
module.exports = router;