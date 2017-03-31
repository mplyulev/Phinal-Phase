var phinalphase = phinalphase || {};

phinalphase.Game = function () { };

phinalphase.Game.prototype = {

  preload: function () {

    this.game.time.advancedTiming = true;

  },

  create: function () {

    //create player



console.log(this.map)
    this.map = this.game.add.tilemap('testlevel');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
    
    this.map.addTilesetImage('tileset', 'gameTiles');

    //create layers

    this.backgroundlayer = this.map.createLayer('Tile Layer 2');

    this.blockedLayer = this.map.createLayer('Tile Layer 1');

    //collision on blockedLayer

    this.map.setCollisionBetween(1, 100000, true, 'Tile Layer 1');

    //resizes the game world to match the layer dimensions

    this.backgroundlayer.resizeWorld();



    this.player = this.game.add.sprite(50, 200, 'player');
    this.game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 1000;
    this.game.camera.follow(this.player);


    this.player.animations.add('idle', Phaser.Animation.generateFrameNames('Idle_', 0, 11, '', 3), 10, true);

  },

  playerHit: function (player, blockedLayer) { },

  update: function () {
    this.game.physics.arcade.collide(this.player, this.blockedLayer, this.playerHit, null, this);
    this.player.animations.play('idle');
  },

  render: function () {

    this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");

  }

};