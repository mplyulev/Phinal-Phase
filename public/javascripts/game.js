var phinalphase = phinalphase || {};

phinalphase.Game = function() {};

phinalphase.Game.prototype = {

    preload: function() {

        this.game.time.advancedTiming = true;

    },

    create: function() {
        this.game.updatables = [];

        // var tiles = [
        //     ['cifiSheet', 'gameTiles']
        // ]

        // var layers = [
        //     ['backgroundlayer', 'background'],
        //     ['blockedLayer', 'blocks']
        // ]

        // var objects = [
        //     ['spikes', 'spikes', 'spikes'],
        //     ['tree', 'spikes', 'tree']
        // ]
        // phinalphase.createMap('testlevel', tiles, layers, objects);

        var tiles = [
            ['gySheet', 'gameTiles']
        ]

        var layers = [
            // ['bg', 'bgImg'],
            ['backgroundlayer', 'background'],
            ['backgroundlayer2', 'background2'],
            ['blockedLayer', 'block']
        ];

        var blockedLayer = layers[2][0]
        console.log(blockedLayer);

        var objects = [
            ['bush', 'objects', 'bush'],
            ['crate', 'objects', 'crate']
        ]
        phinalphase.createMap('testlevel', tiles, layers, objects);

        var backgroundMusic1 = new buzz.sound("/assets/Sound/forest", {
            formats: ["ogg"],
            preload: true,
            autoplay: true,
            loop: true
        });
        var backgroundMusic2 = new buzz.sound("/assets/Sound/swamp", {
            formats: ["ogg"],
            preload: true,
            autoplay: true,
            loop: true
        });


        createPlayerCop(this);
        createPlayerNinja(this);

        this.game.updatables.push(function() {
            updatePlayerNinja(this);
            updatePlayerCop(this);
        }.bind(this));

    },

    update: function() {
        this.game.updatables.forEach(function(f) {
            f();
        }, this);



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