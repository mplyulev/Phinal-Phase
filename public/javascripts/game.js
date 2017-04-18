var phinalphase = phinalphase || {};

phinalphase.Game = function () { };
var worldScale = 1;
phinalphase.Game.prototype = {

    preload: function () {

        this.game.time.advancedTiming = true;

    },



    create: function () {

        // boundsPoint = new Phaser.Point(0, 0);
        // viewRect = new Phaser.Rectangle(0, 0, phinalphase.game.width, phinalphase.game.height);

        // phinalphase.game.world.setBounds(-1000, -1000, 2000, 2000);

        // phinalphase.game.camera.x = (phinalphase.game.width * -0.5);
        // phinalphase.game.camera.y = (phinalphase.game.height * -0.5);

        this.game.updatables = [];



        var tiles = [
            ['cifiSheet', 'gameTiles']
        ]

        var layers = [
            // ['bg', 'bgImg'],
            ['backgroundLayer', 'background'],
            ['blockedLayer', 'block'],

            // ["water", "water"],


        ];


        // console.log(blockedLayer);
        // this.game.add.sprite(200, 200, 'cloud');
        var objects = [
            // ["background", "object", "background"],
            // ["rocks", "object", "rocks"],
            // ["tree", "object", "tree"],
            // ["movable", "object", "tree"],
            // ["bush", "objectsDamage", "bush"],
            // ["skeleton", "sceneObjects", "sceneObject"],
            // ["cutTree", "sceneObjects", "sceneObject"],
            // ["movingPlatform", "movingPlatform", "movingPlatform"],
            // ["staticPlatform", "movingPlatform", "static"],
            // ["saw", "saw", "saw"],
            // ["sawHorizontal", "sawHorizontal", "sawHorizontal"],
            // ["sign2", "sceneObjects", "sceneObject"],
            // ["cross", "sceneObjects", "sceneObject"],
            // ["acid", "objectsDamage", "acid"],
            // ["potion", "potion", "potion"],
            // ["tree", "sceneObjects", "sceneObject"],

            // ["mushroom", "potion", "mushroom"],
            // ["bush5", "sceneObjects", "bush5"],
            // ['crate', 'object', 'crate']





            ["spikes", "objects", "spikes"],
            ["spawn", "spawns", "spawns"],
            ["movingPlatform", "objects", "movingPlatforms"],
            ["saw", "objects", "saws"],
            ["sawHorizontal", "objects", "sawsHorizontal"],
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

        phinalphase.players = phinalphase.game.add.group();
        phinalphase.createPlayerCop(this);
        phinalphase.createPlayerNinja(this);
        // phinalphase.createClouds();



        this.game.updatables.push(function () {
            phinalphase.updatePlayerNinja(this);
            phinalphase.updatePlayerCop(this);

            phinalphase.players.children.forEach(function(grp) {
                grp.children.forEach(function(p) {
                    phinalphase.game.world.wrap(p, 0, true);
                    p.skills.forEach(function(skill){
                        if (skill instanceof phinalphase.Projectile) {
                            skill.weapon.bullets.children.forEach(function(b) {
                                phinalphase.game.world.wrap(b, 0, true);
                            }, this); 
                        }
                    }, this);
                }, this);
                
            }, this);
            
        }.bind(this));

        

    },

    update: function () {

        // if (phinalphase.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
        //     worldScale += 0.05;
        // }
        // else if (phinalphase.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        //     worldScale -= 0.05;
        // }

        // worldScale = Phaser.Math.clamp(worldScale, 0.25, 2);

        // // set our world scale as needed
        // phinalphase.game.world.scale.set(worldScale);


        this.game.updatables.forEach(function (f) {
            f();
        }, this);




        this.game.camera.deadzone = new Phaser.Rectangle(0, 0, 600, 400);
        // this.playerCop.body.moves = false;
        if ((this.playerCop.x > this.playerNinja.x && this.playerCop.alive) || !this.playerNinja.alive) {
            this.game.camera.follow(this.playerCop);
            this.game.camera.focusOnXY(this.playerCop.x + 54, this.playerCop.y);

        } else {
            this.game.camera.follow(this.playerNinja);
            this.game.camera.focusOnXY(this.playerNinja.x + 54, this.playerNinja.y)
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