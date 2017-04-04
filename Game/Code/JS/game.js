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
        console.log(window.innerWidth);
        console.log(this.game.stage.width);
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

    render: function() {


        this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
        this.game.debug.spriteBounds(this.playerNinja);
        this.game.debug.spriteInfo(this.playerNinja, 32, 32);
        this.game.debug.spriteBounds(this.playerCop);
        this.game.debug.spriteInfo(this.playerCop, 532, 32);
    }

};