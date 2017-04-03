var phinalphase = phinalphase || {};

phinalphase.Game = function() {};

phinalphase.Game.prototype = {

    preload: function() {

        this.game.time.advancedTiming = true;

    },

    create: function() {

        //create player

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



        createPlayerNinja(this);
        createPlayerCop(this);
    },

    // playerHit: function (player, blockedLayer) { },

    update: function() {
        updatePlayerNinja(this);
        updatePlayerCop(this);
    },

    render: function() {

        this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
        this.game.debug.spriteBounds(this.playerCop);
        this.game.debug.spriteInfo(this.playerCop, 32, 32);
    }

};