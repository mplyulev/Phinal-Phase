var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer");

var users = db.get("users");
router.post('/', function(req, res, next) {
    // users.find()
    console.log(req.session.userId);
   var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "mplulev@gmail.com",
        pass: "rastafare321"
    }
});
                var mailOptions = {
    from:  req.session.userId ,
    to: "mplulev@gmail.com", 
    subject: "PhinalPhase Password Recovery! ",  
    html:"<img src='http://i.imgur.com/iuzDfkx.png' style='margin-bottom:30px; display:block;margin:0 auto;'> "   
}
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
});
});

module.exports=router;