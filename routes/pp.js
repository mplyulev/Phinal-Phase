var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('pp', {
    headScripts: [
      { script: "//cdn.jsdelivr.net/phaser/2.6.2/phaser.min.js" },
      { script: "//cdnjs.cloudflare.com/ajax/libs/buzz/1.2.0/buzz.min.js" },
      { script: "//cdnjs.cloudflare.com/ajax/libs/socket.io/1.7.3/socket.io.min.js"},
      { script: "/javascripts/boot.js" },
      { script: "/javascripts/preload.js" },
      { script: "/javascripts/mainmenu.js" },
      { script: "/javascripts/tiledObjects.js" },
      { script: "/javascripts/map.js" },
      { script: "/javascripts/Sound.js" },
      { script: "/javascripts/skill.js" },
      { script: "/javascripts/player.js" },
      { script: "/javascripts/playerNinja.js" },
      { script: "/javascripts/playerCop.js" },
      { script: "/javascripts/game.js" }
    ]
  });
});

module.exports = router;