var phinalphase = phinalphase || {};

phinalphase.Game = function () { };

phinalphase.Game.addNewPlayer = function (player, main) {
    if (player.x == 0) {
        player.x = phinalphase.spawns.children[player.id % phinalphase.spawns.children.length].x;
        player.y = phinalphase.spawns.children[player.id % phinalphase.spawns.children.length].y;
    }

    phinalphase.Game.playerMap[player.id] = new phinalphase.Player(player);

    if (main) {
        phinalphase.clientPlayer = phinalphase.Game.playerMap[player.id];
        phinalphase.game.camera.follow(phinalphase.Game.playerMap[player.id]);
    }

}

phinalphase.Game.addOldPlayer = function (player) {
    phinalphase.Game.playerMap[player.id] = new phinalphase.Player(player);
}

phinalphase.Game.removePlayer = function (id) {
    phinalphase.Game.playerMap[id].destroy();
    delete phinalphase.Game.playerMap[id];
};

phinalphase.Game.playerAct = function (id, act) {
    phinalphase.Game.playerMap[id].act(act);
};

phinalphase.Game.updatePlayer = function (serverPlayer) {
    var player = phinalphase.Game.playerMap[serverPlayer.id]
    phinalphase.clientPlayer = player;
    player.Update();
    var newPlayer = {
        x: player.x,
        y: player.y,
        health: player.health,
        energy: player.energy,
        isInAir: player.isInAir,
        busy: player.busy,
        canAttackAgain: player.canAttackAgain,
        alive: player.alive,
        isFlinched: player.isFlinched,
        canBeHitted: player.canBeHitted,
        oldCropY: player.oldCropY,
        oldCropX: player.oldCropX
    }
    Client.sendUpdates(newPlayer);

};



phinalphase.Game.prototype = {

    preload: function () {
        this.game.stage.disableVisibilityChange = true;
        this.game.time.advancedTiming = true;
    },



    create: function () {
        phinalphase.Game.playerMap = {};
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
        // phinalphase.createPlayerCop(this);
        // phinalphase.createPlayerNinja(this);
        // phinalphase.createClouds();



        this.game.updatables.push(function () {
            // phinalphase.updatePlayerNinja(this);
            // phinalphase.updatePlayerCop(this);

            // phinalphase.players.children.forEach(function(grp) {
            //     grp.children.forEach(function(p) {
            //         phinalphase.game.world.wrap(p, 0, true);
            //         p.skills.forEach(function(skill){
            //             if (skill instanceof phinalphase.Projectile) {
            //                 skill.weapon.bullets.children.forEach(function(b) {
            //                     phinalphase.game.world.wrap(b, 0, true);
            //                 }, this); 
            //             }
            //         }, this);
            //     }, this);

            // }, this);

        }.bind(this));


        Client.askNewPlayer();
    },

    update: function () {

        Client.reqUpdate();
        if (phinalphase.clientPlayer) {

            var player = phinalphase.clientPlayer;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                Client.sendAct('RIGHT');
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                Client.sendAct('LEFT');
            } else {
                if (!player.isInAir) {
                    Client.sendAct();
                }
            }

            if (player.body.velocity.y > 0 && player.isInAir) {
                Client.sendAct('FALL');
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && !player.isInAir) {
                Client.sendAct('UP');
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.L)) {
                Client.sendAct('SKILL', 2);
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.O)) {
                Client.sendAct('SKILL', 0);
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
                Client.sendAct('SKILL', 1);
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.K)) {
                Client.sendAct('SKILL', 3);
            }

        }


        this.game.updatables.forEach(function (f) {
            f();
        }, this);



    },

    render: function () {


        this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
        // this.game.debug.spriteBounds(this.playerNinja);
        // this.game.debug.spriteBounds(this.playerNinja.skills[2].weapon);
        // this.game.debug.spriteInfo(this.playerNinja, 32, 32);
        // this.game.debug.bodyInfo(this.playerNinja, 100, 150);
        // this.game.debug.body(this.playerNinja);
        // this.game.debug.spriteBounds(this.playerCop);
        // this.game.debug.spriteInfo(this.playerCop, 532, 32);
    }

};