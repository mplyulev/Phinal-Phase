var phinalphase = phinalphase || {};

phinalphase.Game = function () { };

phinalphase.Game.prototype = {

  preload: function () {

    this.game.time.advancedTiming = true;

  },

  create: function () {

    //create player




    this.map = this.game.add.tilemap('testlevel');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset

    this.map.addTilesetImage('tileset1', 'gameTiles');

    //create layers

    this.backgroundlayer = this.map.createLayer('bg');

    this.blockedLayer = this.map.createLayer('blockedLayer');

    //collision on blockedLayer

    this.map.setCollisionBetween(1, 100000, true, 'blockedLayer');

    //resizes the game world to match the layer dimensions

    this.backgroundlayer.resizeWorld();



    this.player = this.game.add.sprite(100, 300, 'player');
    this.player.scale.setTo(0.2, 0.2);
    this.game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 1000;
    this.game.camera.follow(this.player);

  },

  playerHit: function (player, blockedLayer) { },

  update: function () {
    this.game.physics.arcade.collide(this.player, this.blockedLayer, this.playerHit, null, this);

  },

  render: function () {

    this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");

  }

};