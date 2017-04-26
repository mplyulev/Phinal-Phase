var phinalphase = phinalphase || {};

phinalphase.Game = function () { };

phinalphase.deltaTime = 0;
phinalphase.isHost = false;
phinalphase.hostUpd = 0;

phinalphase.putDeltaSpeed = function (speed) {
    return (speed * phinalphase.game.time.physicsElapsed) * phinalphase.game.time.fps;
}


phinalphase.Game.addNewPlayer = function (player, main, host, timer) {
    if (player.x == 0) {
        var spawnCoor = Math.floor(Math.random() * phinalphase.spawns.children.length);
        player.x = phinalphase.spawns.children[spawnCoor].x;
        player.y = phinalphase.spawns.children[spawnCoor].y;
    }
    phinalphase.Game.playerMap[player.id] = new phinalphase.Player(player);

    if (main) {
        phinalphase.matchTime = timer;
        if (host) {
            phinalphase.isHost = true;
        }
        phinalphase.playerID = player.id;
        phinalphase.game.camera.follow(phinalphase.Game.playerMap[player.id]);
        phinalphase.game.camera.deadzone = new Phaser.Rectangle(300, 200, 200, 150);
    }

}

phinalphase.Game.addOldPlayer = function (player) {
    phinalphase.Game.playerMap[player.id] = new phinalphase.Player(player);
}

phinalphase.Game.removePlayer = function (id) {
    phinalphase.Game.playerMap[id].destroy();
    delete phinalphase.Game.playerMap[id];
};

phinalphase.Game.playerAct = function (id, act, cause) {
    phinalphase.Game.playerMap[id].act(act, cause);
};

phinalphase.Game.syncPlayer = function (id, x, y) {
    var oldX = phinalphase.Game.playerMap[id].x;
    var oldY = phinalphase.Game.playerMap[id].y;
    phinalphase.Game.playerMap[id].x = x;
    phinalphase.Game.playerMap[id].y = y;
    if (phinalphase.Game.playerMap[id].body.embedded) {
        phinalphase.Game.playerMap[id].x = oldX;
        phinalphase.Game.playerMap[id].y = oldY;
    }
};

phinalphase.Game.syncObjects = function (data) {
    phinalphase.Game.objectMap.forEach(function (object, index) {
        var oldX = object.x;
        var oldY = object.y;
        var oldPos = object.currentPos;

        object.x = data[index][0];
        object.y = data[index][1];
        if (object.currentPos) {
            object.currentPos = data[index][2];
        }
        if (data[index][3]) {
            object.revive();
        } else {
            object.kill();
        }
        if (object.body.embedded) {
            object.x = oldX;
            object.y = oldY;
            if (object.currentPos) {
                object.currentPos = oldPos;
            }
        }
    }, this);
}

phinalphase.Game.updatePlayer = function (id) {
    var player = phinalphase.Game.playerMap[id];
    phinalphase.Game.playerMap[id].Update();

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
        changingOffset: player.changingOffset,
        energyRegen: player.energyRegen,
        defense: player.defense,
        gravity: player.body.gravity.y,
        jumpHeight: player.jumpHeight,
        speed: player.speed,
        oldCropX: player.oldCropX,
        oldCropY: player.oldCropY,
        kills: player.kills,
        deaths: player.deaths,
        score: player.score
    }
    Client.sendUpdates(newPlayer);
};



phinalphase.Game.prototype = {

    preload: function () {
        this.game.forceSingleUpdate = false;
        this.game.stage.disableVisibilityChange = true;
        this.game.time.advancedTiming = true;
    },



    create: function () {

        phinalphase.Game.playerMap = {};
        phinalphase.Game.objectMap = [];
        this.game.updatables = [];



        var tiles = [
            ['cifiSheet', 'gameTiles']
        ]

        var layers = [
            // ['bg', 'bgImg'],
            ['backgroundLayer', 'background'],
            ['backgroundLayer2', 'background2'],
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
            ["platform", "objects", "platforms"],
            ["saw", "objects", "saws"],
            ["potionH", "objects", "potionsH"],
            ["potionP", "objects", "potionsP"],
            ["potionE", "objects", "potionsE"],
            ["box", "objects", "boxs"],
            ["toxic", "objects", "toxic"],
            ["spikes", "objects", "spikes"],
            // ["tree", "object", "tree"],
            // ['bush', 'objects', 'bush'],

        ]

        phinalphase.createMap('testlevel', tiles, layers, objects);



        // var backgroundMusic1 = new buzz.sound("/assets/Sound/forest", {
        //     formats: ["ogg"],
        //     preload: true,
        //     autoplay: true,
        //     loop: true
        // });
        // var backgroundMusic2 = new buzz.sound("/assets/Sound/swamp", {
        //     formats: ["ogg"],
        //     preload: true,
        //     autoplay: true,
        //     loop: true
        // });

        phinalphase.players = phinalphase.game.add.group();
        // phinalphase.createPlayerCop(this);
        // phinalphase.createPlayerNinja(this);
        // phinalphase.createClouds();



        this.game.updatables.push(function () {

            phinalphase.players.children.forEach(function (p) {

                phinalphase.game.world.wrap(p, 0, true);
                p.skills.forEach(function (skill) {
                    if (skill instanceof phinalphase.Projectile) {
                        skill.weapon.bullets.children.forEach(function (b) {
                            phinalphase.game.world.wrap(b, 0, true);
                        }, this);
                    }
                }, this);


            }, this);

        }.bind(this));


        Client.askNewPlayer([phinalphase.playerNinja, phinalphase.playerCop]);

        this.healthContainer = this.game.add.sprite(10, 10, 'healthContainer');
        this.healthContainer.scale.setTo(0.5);
        this.healthContainer.fixedToCamera = true;

        this.healthbar = this.game.add.sprite(74, 26, 'healthbar');
        this.healthbar.scale.setTo(0.5);
        this.healthbarWidth = this.healthbar.width;
        this.healthbar.fixedToCamera = true;


        this.energyContainer = this.game.add.sprite(10, 80, 'energyContainer');
        this.energyContainer.scale.setTo(0.4);
        this.energyContainer.fixedToCamera = true;

        this.energybar = this.game.add.sprite(60, 93, 'energybar');
        this.energybar.scale.setTo(0.4);
        this.energybarWidth = this.energybar.width;
        this.energybar.fixedToCamera = true;


        this.kills = this.game.add.sprite(270, 15, 'kills');
        this.kills.scale.setTo(0.06);
        this.kills.fixedToCamera = true;


        this.killsText = this.game.add.text(315, 35, "__", {
            font: "20px Arial",
            fill: "#AAA",
            align: "center"
        });
        this.killsText.fixedToCamera = true;


        this.deaths = this.game.add.sprite(265, 70, 'deaths');
        this.deaths.scale.setTo(0.05);
        this.deaths.fixedToCamera = true;

        this.deathsText = this.game.add.text(315, 85, "__", {
            font: "20px Arial",
            fill: "#AAA",
            align: "center"
        });
        this.deathsText.fixedToCamera = true;




        phinalphase.game.time.events.add(1000, function () {
            this.matchTimer = this.game.time.create(false);

            this.matchTimer.add(phinalphase.matchTime || 20000, function () {

            }, this);

            this.matchTimer.start();
        }.bind(this));




        this.matchTimerText = this.game.add.text(450, 20, "__", {
            font: "20px Arial",
            fill: "#AAA",
            align: "center"
        });
        this.matchTimerText.fixedToCamera = true;




    },

    update: function () {


        if (this.matchTimer) {
            var min = Math.floor((this.matchTimer.duration / 1000) / 60);
            if (min.toString().length <= 1) {
                min = '0' + min;
            }
            var sec = Math.floor((this.matchTimer.duration / 1000) % 60);
            if (sec.toString().length <= 1) {
                sec = '0' + sec;
            }
            this.matchTimerText.setText(min + ':' +  sec);
        }


        if (phinalphase.isHost) {
            var objectsCoor = {};
            phinalphase.Game.objectMap.forEach(function (object, index) {
                if (phinalphase.hostUpd < 5) {
                    objectsCoor[index] = [object.x, object.y, object.currentPos, true];
                    object.revive();
                } else {
                    objectsCoor[index] = [object.x, object.y, object.currentPos, object.alive];
                }
            }, this);
            Client.syncObjects(objectsCoor);
            phinalphase.hostUpd++;
            if (this.matchTimer) {
                Client.syncTimer(this.matchTimer.duration);
            }
        }

        Client.reqUpdate();

        var player = phinalphase.Game.playerMap[phinalphase.playerID];

        if (player) {
            Client.sync(player.x, player.y);

            this.killsText.setText(player.kills);
            this.deathsText.setText(player.deaths);

            if (player.health / 100 <= 0) {
                this.healthbar.width = 0;
            } else {
                this.healthbar.width = this.healthbarWidth * (player.health / 100);
            }
            if (player.energy / 100 <= 0) {
                this.energybar.width = 0;
            } else {
                this.energybar.width = this.energybarWidth * (player.energy / 100);
            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                Client.sendAct('RIGHT');
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                Client.sendAct('LEFT');
            } else {
                if (!player.isInAir) {
                    Client.sendAct();
                }
            }

            if (player.body.velocity.y > 200 && player.isInAir) {
                Client.sendAct('FALL');
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP) && !player.isInAir) {
                Client.sendAct('UP');
            }



            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
                Client.sendAct('SKILL', 0);
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
                Client.sendAct('SKILL', 1);
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.E)) {
                Client.sendAct('SKILL', 2);
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.R)) {
                Client.sendAct('SKILL', 3);
            }

        }


        this.game.updatables.forEach(function (f) {
            f();
        }, this);



    },

    // render: function () {


    //     // this.game.debug.text(this.game.time.fps || '--', 20, 70, "#00ff00", "40px Courier");
    //     // this.game.debug.spriteBounds(this.playerNinja);
    //     // this.game.debug.spriteBounds(this.playerNinja.skills[2].weapon);
    //     // this.game.debug.spriteInfo(this.playerNinja, 32, 32);
    //     // this.game.debug.bodyInfo(this.playerNinja, 100, 150);
    //     // this.game.debug.body(this.playerNinja);
    //     // if (phinalphase.Game.playerMap[phinalphase.playerID]) {
    //     //     // this.game.debug.spriteBounds(phinalphase.Game.playerMap[phinalphase.playerID]);
    //     //     this.game.debug.body(phinalphase.Game.playerMap[phinalphase.playerID]);
    //     // }
    //     // this.game.debug.spriteInfo(this.playerCop, 532, 32);
    // }

};