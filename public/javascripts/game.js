var phinalphase = phinalphase || {};

phinalphase.Game = function () { };

phinalphase.Game.prototype = {

    preload: function () {

        this.game.time.advancedTiming = true;

    },

    create: function () {
        this.game.updatables = [function () {
            if (!phinalphase.players.children[0].alive && !phinalphase.players.children[1].alive) {
                // phinalphase.game.state.start('Boot', true, false);
                window.location = '';
            }
        }];



        var tiles = [
            ['forest', 'gameTiles']
        ]

        var layers = [
            // ['bg', 'bgImg'],

            ['blockedLayer', 'block'],
            // ["water", "water"],


        ];


        // console.log(blockedLayer);
        // this.game.add.sprite(200, 200, 'cloud');
        var objects = [
            ["background", "object", "background"],
            ["rocks", "object", "rocks"],
            ["tree", "object", "tree"],
            ["movable", "object", "tree"],
            ["bush", "objectsDamage", "bush"],
            ["skeleton", "sceneObjects", "sceneObject"],
            ["cutTree", "sceneObjects", "sceneObject"],
            ["movingPlatform", "movingPlatform", "movingPlatform"],
            ["staticPlatform", "movingPlatform", "static"],
            ["saw", "saw", "saw"],
            ["sawHorizontal", "sawHorizontal", "sawHorizontal"],
            ["sign2", "sceneObjects", "sceneObject"],
            ["cross", "sceneObjects", "sceneObject"],
            ["acid", "objectsDamage", "acid"],
            ["potion", "potion", "potion"],
            ["tree", "sceneObjects", "sceneObject"],

            ["mushroom", "potion", "mushroom"],
            ["bush5", "sceneObjects", "bush5"],
            ['crate', 'object', 'crate']





            // ["spike", "object", "tree"],
            // ["tree", "object", "tree"],
            // ['bush', 'objects', 'bush'],

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


        phinalphase.createPlayerCop(this);
        phinalphase.createPlayerNinja(this);
        phinalphase.createClouds();



        this.game.updatables.push(function () {
            phinalphase.updatePlayerNinja(this);
            phinalphase.updatePlayerCop(this);
        }.bind(this));

    },

    update: function () {
        this.game.updatables.forEach(function (f) {
            f();
        }, this);




        this.game.camera.deadzone = new Phaser.Rectangle(0, 0, 600, 400);
        // this.playerCop.body.moves = false;
        if ((this.playerCop.x > this.playerNinja.x && this.playerCop.alive)|| !this.playerNinja.alive) {
            this.game.camera.follow(this.playerCop);
            this.game.camera.focusOnXY(this.playerCop.x + 54, this.playerCop.y);

        } else {
            this.game.camera.follow(this.playerNinja);
            this.game.camera.focusOnXY(this.playerNinja.x + 54, this.playerNinja.y)
        }
        if (this.playerCop.x < this.playerNinja.x) {

        }

    },

    render: function () {


        this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
        this.game.debug.spriteBounds(this.playerNinja);
        this.game.debug.spriteBounds(this.playerNinja.skills[2].weapon);
        this.game.debug.spriteInfo(this.playerNinja, 32, 32);
        this.game.debug.bodyInfo(this.playerNinja, 100, 150);
        this.game.debug.body(this.playerNinja);
        this.game.debug.spriteBounds(this.playerCop);
        this.game.debug.spriteInfo(this.playerCop, 532, 32);
    }

};