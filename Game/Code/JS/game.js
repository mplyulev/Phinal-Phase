var phinalphase = phinalphase || {};

phinalphase.Game = function () { };

phinalphase.Game.prototype = {

  preload: function () {

    this.game.time.advancedTiming = true;

  },

  create: function () {
    this.creatures = phinalphase.game.add.group();
    this.players = phinalphase.game.add.group();
    this.enemies = phinalphase.game.add.group();

    this.map = this.game.add.tilemap('testlevel');

    //the first parameter is the tileset name as specified in Tiled, the second is the key to the asset

    this.map.addTilesetImage('cifiSheet', 'gameTiles');

    //create layers






    this.backgroundlayer = this.map.createLayer('background');
    this.backgroundlayer2 = this.map.createLayer('background2');
    this.slime = this.map.createLayer('slime');
    // this.enemyObjects = this.map.createLayer('enemyObjects');

    this.blockedLayer = this.map.createLayer('blocks');

    //collision on blockedLayer

    this.map.setCollisionBetween(1, 200000, true, 'blocks');


    //resizes the game world to match the layer dimensions

    this.backgroundlayer.resizeWorld();

    phinalphase.оbjectGroupFromTiled('spikes', this.map, 'spikes', 'spikes');




    createPlayerCop(this);
    createPlayerNinja(this);

  },


  update: function () {
    this.physics.arcade.overlap(phinalphase.players, phinalphase.spikes, function (player, spike) {
      player.getHitted(spike);
    }, null, this);
    updatePlayerNinja(this);
    updatePlayerCop(this);
  },

  render: function () {

    this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
    // this.game.debug.spriteBounds(this.playerNinja);
    // this.game.debug.spriteInfo(this.playerNinja, 32, 32);
    // this.game.debug.spriteBounds(this.playerCop);
    // this.game.debug.spriteInfo(this.playerCop, 32, 32);
  }

};