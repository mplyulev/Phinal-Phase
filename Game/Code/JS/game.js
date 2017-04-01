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

    this.backgroundlayer = this.map.createLayer('background');

    this.blockedLayer = this.map.createLayer('blocks');

    //collision on blockedLayer

    this.map.setCollisionBetween(1, 200000, true, 'blocks');

    //resizes the game world to match the layer dimensions

    this.backgroundlayer.resizeWorld();



    this.player = this.game.add.sprite(50, 350, 'player', 'Idle_000');
    this.game.physics.arcade.enable(this.player);
    this.player.body.gravity.y = 1000;
    this.game.camera.follow(this.player);
    this.player.anchor.setTo(0.5, 0.5);

    // 


    this.player.animations.add('idle', Phaser.Animation.generateFrameNames('Idle_', 0, 11, '', 3), 15, true);
    this.player.animations.add('run', Phaser.Animation.generateFrameNames('Run_', 0, 12, '', 3), 15, true);
    this.player.animations.add('jumpStart', Phaser.Animation.generateFrameNames('Jump Start_', 0, 9, '', 3), 25, true);
    this.player.animations.add('jumpAir', Phaser.Animation.generateFrameNames('Jump On Air_', 0, 0, '', 3), 15, true);
    this.player.animations.add('jumpFall', Phaser.Animation.generateFrameNames('Jump Fall_', 0, 0, '', 3), 15, true);
  },

  playerHit: function (player, blockedLayer) { },

  update: function () {
    this.game.physics.arcade.collide(this.player, this.blockedLayer, this.playerHit, null, this);
    this.player.body.velocity.x = 0;
    if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      this.player.scale.setTo(1, 1);
      this.player.body.velocity.x = 250;
      if (this.player.body.blocked.down) {
        this.player.animations.play('run');
      } else {
        this.player.animations.play('jumpAir');
      }
    } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      this.player.scale.setTo(-1, 1);
      this.player.body.velocity.x = -250;
      if (this.player.body.blocked.down) {
        this.player.animations.play('run');
      } else {
        this.player.animations.play('jumpAir');
      }


    } else {
      if (this.player.body.blocked.down) {
        this.player.animations.play('idle');
      }
    }

    if (this.player.body.velocity.y > 0) {
      this.player.animations.play('jumpFall');
    }

    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && this.player.body.blocked.down) {
      this.player.body.velocity.y = -700;
      this.player.animations.play('jumpStart');

      this.player.animations.currentAnim.loop = false;
      this.player.animations.currentAnim.onComplete.add(function () { this.player.animations.play('jumpAir'); }, this);
    }
  },

  render: function () {

    this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");

  }

};