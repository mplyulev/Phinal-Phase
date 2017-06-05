var express = require('express');
var router = express.Router();
users = db.get("users");
router.get('/', function (req, res, next) {
    users.find({ _id: req.session.userId }, { avatarURL: 1 })
    .then(function (data) {
        var avatarURL = data[0].avatarURL;
        res.json(data);
    }).catch(function (err) {
        res.json(500, err);
    });
});
module.exports = router;