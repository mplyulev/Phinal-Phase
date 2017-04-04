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

    this.map.addTilesetImage('cifiSheet', 'gameTiles');






    this.backgroundlayer = this.map.createLayer('background');
    this.backgroundlayer2 = this.map.createLayer('background2');
    this.slime = this.map.createLayer('slime');

    this.blockedLayer = this.map.createLayer('blocks');



    this.map.setCollisionBetween(1, 200000, true, 'blocks');

    phinalphase.оbjectGroupFromTiled('spikes', this.map, 'spikes', 'spikes');

    this.backgroundlayer.resizeWorld();


    createPlayerCop(this);
    createPlayerNinja(this);

  },







  update: function () {
    this.physics.arcade.overlap(phinalphase.players, phinalphase.spikes, function (player, spike) {
      player.getHitted(spike);
    }, null, this);

    updatePlayerNinja(this);
    updatePlayerCop(this);
    this.game.camera.deadzone = new Phaser.Rectangle(0, 0, 600, 400);
    // this.playerCop.body.moves = false;
    if (this.playerCop.x > this.playerNinja.x) {
      this.game.camera.follow(this.playerCop);
      this.game.camera.focusOnXY(this.playerCop.x + 54, this.playerCop.y);

    }
    if (this.playerCop.x < this.playerNinja.x) {
      this.game.camera.follow(this.playerNinja);
      this.game.camera.focusOnXY(this.playerNinja.x + 54, this.playerNinja.y)
    }
    if (!this.playerNinja.inCamera && this.playerCop.facing === "right") {
      this.playerCop.body.velocity.x = 0;
      if (this.playerNinja.facing === "left") {
        this.playerNinja.body.velocity.x = 0;
      }

    }
    if (!this.playerCop.inCamera && this.playerNinja.facing === "right") {
      this.playerNinja.body.velocity.x = 0;
      if (this.playerCop.facing === "left") {
        console.log("asdasad");
        this.playerCop.body.velocity.x = 0;
      }
    }

    {
      // var medianX = (this.playerCop.body.x > this.playerNinja.body.x) ? (this.playerCop.body.x - this.playerNinja.body.x) : (this.playerNinja.body.x - this.playerCop.body.x);
      // var medianY = (this.playerCop.body.y > this.playerNinja.body.y) ? (this.playerCop.body.y - this.playerNinja.body.y) : (this.playerNinja.body.y - this.playerCop.body.y);
      // this.game.camera.focusOnXY(medianX, medianY);
      // if (this.playerCop.body.x < this.game.camera.view.x) {
      //     this.playerCop.stopMoveLeft();
      // }
      // if (this.playerNinja.body.x < this.game.camera.view.x) {
      //     this.playerNinja.stopMoveLeft();
      // }


      // if (this.playerCop.body.right > this.game.camera.view.right) {
      //     this.playerCop.stopMoveRight();
      // }
      // if (this.playerNinja.body.right > this.game.camera.view.right) {
      //     this.playerNinja.stopMoveRight();
      // }


    }
  },

  render: function () {


    this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
    this.game.debug.spriteBounds(this.playerNinja);
    this.game.debug.spriteInfo(this.playerNinja, 32, 32);
    this.game.debug.spriteBounds(this.playerCop);
    this.game.debug.spriteInfo(this.playerCop, 532, 32);
  }

};