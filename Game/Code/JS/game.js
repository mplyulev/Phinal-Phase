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

    this.map.addTilesetImage('tileset', 'gameTiles');

    //create layers

    this.backgroundlayer = this.map.createLayer('background');
    this.water = this.map.createLayer('water');
    this.enemyObjects = this.map.createLayer('enemyObjects');

    this.blockedLayer = this.map.createLayer('block');

    //collision on blockedLayer

    this.map.setCollisionBetween(1, 200000, true, 'block');

    //resizes the game world to match the layer dimensions

    this.backgroundlayer.resizeWorld();


    console.log(phinalphase);
    createPlayerNinja(this);

  },

  // playerHit: function (player, blockedLayer) { },

  update: function () {
    updatePlayerNinja(this);
  },

  render: function () {

    this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
    this.game.debug.spriteBounds(this.playerNinja);
    this.game.debug.spriteInfo(this.playerNinja, 32, 32);
  }

};