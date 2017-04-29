var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var flash = require("connect-flash")


// Load the password hash from DB
// Let's assume it's stored in a variable called `hash`
 

var users = db.get('users');
router.post('/', function (req, res, next) {
    var usernameLogin = req.body.usernameLogin.trim();
    var passwordLogin = req.body.key;
    

    users.find({ username: usernameLogin  })
        .then(function (data) {
           
            if (data.length > 0 && bcrypt.compareSync(passwordLogin, data[0].password)) {
                var loggedInUser = data[0].username;
                console.log(bcrypt.compareSync(passwordLogin, data[0].password));
                req.session.userId = data[0]._id;
                res.redirect('/index');
            } 
            else {
                req.flash('/login', 'it worked');
                // res.render("/login",  req.flash('/login', 'it worked'));
                 console.log(bcrypt.compareSync(passwordLogin, data[0].password));
              
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