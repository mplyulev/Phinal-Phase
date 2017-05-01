var express = require('express');
var router = express.Router();

var users = db.get('users');

router.post('/', function (req, res, next) {
    var messageBody = req.body.messageMail;
    var subject = req.body.subject;
    var messageTarget = req.body.messageTarget.trim();
    var id = req.session.username;
    var loggedInUser = req.session.username;
    users.find({ username: messageTarget })
        .then(function (data) {
            users.update({ username: messageTarget }, {
                $push: {
                    "inboxMessages": {
                        sender: loggedInUser, subject: subject, messageBody: messageBody, date: new Date()
                    }
                }
            });
        });
});

module.exports = router;