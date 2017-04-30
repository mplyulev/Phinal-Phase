var express = require('express');
var router = express.Router();

var users = db.get('users');
console.log(users);

router.post('/', function(req, res, next) {
var messageBody = req.body.messageMail;
var subject = req.body.subject;
var messageTarget = req.body.messageTarget.trim();
// console.log(messageTarget.length);
 var id = req.session.username;
console.log(id);
var loggedInUser = req.session.username;
console.log(loggedInUser);
// console.log(messageTarget==="IrieBear");
// console.log("checl")
// console.log(messageTarget);
users.find({username:messageTarget}) 
        .then(function (data) {
            console.log(data[0]);
            // console.log(data);
users.update( {username:messageTarget} ,{ $push : {
            "inboxMessages":{  
                sender: loggedInUser,subject: subject,messageBody:messageBody,date:new Date()
            }
          }});
          console.log(data[0]);
        });
});

module.exports = router;