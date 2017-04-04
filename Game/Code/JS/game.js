var phinalphase = phinalphase || {};

phinalphase.Game = function() {};

phinalphase.Game.prototype = {

    preload: function() {

        this.game.time.advancedTiming = true;

    },

    create: function() {

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


        createPlayerCop(this);
        createPlayerNinja(this);

        // this.grp = this.game.add.group();
        // this.grp.add(this.playerNinja);
        // this.grp.prototype = Object.create(null);
        // this.grp.prototype.play = function (a) {
        //   console.log(a);
        // }
        // console.log(this.grp.children[0].name);
    },

    // playerHit: function (player, blockedLayer) { },

    update: function() {
        updatePlayerNinja(this);
        updatePlayerCop(this);
    },

    render: function() {

        this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
        this.game.debug.spriteBounds(this.playerNinja);
        this.game.debug.spriteInfo(this.playerNinja, 32, 32);
        // this.game.debug.spriteBounds(this.playerCop);
        // this.game.debug.spriteInfo(this.playerCop, 32, 32);
    }

};