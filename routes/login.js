var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
 


// Load the password hash from DB
// Let's assume it's stored in a variable called `hash`
 

var users = db.get('users');
router.post('/', function (req, res, next) {
    var usernameLogin = req.body.usernameLogin.trim();
    var passwordLogin = req.body.key;
    

    users.find({ username: usernameLogin  })
        .then(function (data) {
            if (data.length > 0 && bcrypt.compareSync(passwordLogin, data[0].password)) {
                req.session.username = data[0].username;
                req.session.userId = data[0]._id;
                res.redirect('/index');
            } 
            else  {
                res.render("login", {message:"Wrong username or password!"});
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