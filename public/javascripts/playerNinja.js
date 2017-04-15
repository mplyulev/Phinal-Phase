var phinalphase = phinalphase || {};

phinalphase.createPlayerNinja = function (that) {
    var anim = {
        idle: ['idle', 'Idle_', 0, 11, '', 3, 15, 0, 0],
        run: ['run', 'Run_', 0, 12, '', 3, 15, 0, 0],
        jumpStart: ['jumpStart', 'Jump Start_', 0, 11, '', 3, 15, 0, 0],
        jumpAir: ['jumpAir', 'Jump On Air_', 0, 0, '', 3, 15, 0, 0],
        jumpFall: ['jumpFall', 'Jump Fall_', 0, 0, '', 3, 15, 0, 0],
        attack: ['attack1', 'Attack_', 0, 13, '', 3, 15, 11, 0],
        hurt: ['hurt', 'Hurt_', 0, 11, '', 3, 20, 0, 0],
        death: ['death', 'Death_', 0, 19, '', 3, 20, 10, 0],
        block: ['block', 'Block Parry_', 0, 19, '', 3, 20, 0, 0]
    };

    var skills = [
        {
            type: 'aurabuff',
            enerReq: 10,
            key: 'popAura',
            frame: 'pop_explosion0001',    
            cooldown: 15,
            userAnim: anim.block[0],
            stop: true,
            duration: 10,
            anim: ['pop', 'pop_explosion', 1, 18, '', 4, 15],                     
            effects: function (that) {
                that.speedX += 100;
            },
            afterEffects: function (that) {
                that.speedX -= 100;
            }       
        },
        // {
        //     type: 'auradmg',
        //     enerReq: 10,
        //     key: 'popAura',
        //     frame: 'pop_explosion0001',
        //     duration: 10,
        //     cooldown: 15,
        //     anim: ['pop', 'pop_explosion', 1, 18, '', 4, 15],
        //     dmg: 10,
        //     enemyCollide: function (enemy) {

        //     },
        //     userAnim: anim.block[0],
        //     stop: true
        // },

        {
            type: 'proj',
            enerReq: 10,
            key: 'fireball',
            frame: 'fireball',
            cooldown: 1,
            userAnim: anim.block[0],
            stop: true,
            dmg: 10,
            enemyCollide: function() {

            },
            bullet: {
                number: 1,
                killType: 'KILL_CAMERA_BOUNDS',
                speed: 500,
                scaleX: 0.3,
                scaleY: 0.3,
                repeat: true
            },
            offsetX: 0,
            offsetY: -30

        }
    ]
    that.playerNinja = new phinalphase.Player(that.game, 250, 350, 'playerNinja', 'Idle_000', 1000, 0.5, 1, -700, 300, 100, 100, anim, skills);
    that.playerNinja.checkWorldBounds = true;
    that.playerNinja.walkingSound = new buzz.sound("/assets/Sound/footstep09", {
        formats: ["ogg"],
        volume: 20,
        preload: true,
    });
    that.playerNinja.jumpSound = new buzz.sound("/assets/Sound/jump", {
        formats: ["mp3"],
        volume: 60,
        preload: true,
    });
    that.playerNinja.swordSound = new buzz.sound("/assets/Sound/sword", {
        formats: ["wav"],
        volume: 60,
        preload: true,
    });
    that.playerNinja.swordSound.setSpeed(0.6);

    that.playerNinja.hurtSound = new buzz.sound("/assets/Sound/pain2", {
        formats: ["wav"],
        volume: 60,
        preload: true,
    });
    that.playerNinja.powerUpSound = new buzz.sound("/assets/Sound/teleport", {
        formats: ["wav"],
        volume: 60,
        preload: true,
    });
    that.playerNinja.dieSound = new buzz.sound("/assets/Sound/player/die", {
        formats: ["wav"],
        volume: 60,
        preload: true,
    });
    that.playerNinja.healSound = new buzz.sound("/assets/Sound/spell3", {
        formats: ["wav"],
        preload: true,
        volume: 60
    });   




    that.playerNinja.playNinjaSounds = function () {
        if (that.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !that.playerNinja.isInAir && !that.playerNinja.busy) {
            that.playerNinja.walkingSound.play();
        } else if (that.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !that.playerNinja.isInAir && !that.playerNinja.busy) {
            that.playerNinja.walkingSound.play();
        }
        if (that.game.input.keyboard.isDown(Phaser.Keyboard.UP) && that.playerNinja.body.blocked.down) {
            that.playerNinja.jumpSound.play();
        }
        if (that.playerNinja.isInAir && that.playerNinja.body.blocked.down) {
            that.playerNinja.walkingSound.play();
        }
        if (that.game.input.keyboard.isDown(Phaser.Keyboard.L)) {
            that.playerNinja.swordSound.play();
        }
        if (that.game.input.keyboard.isDown(Phaser.Keyboard.O)) {
            that.playerNinja.powerUpSound.play();
        }
        if (that.playerNinja.isFlinched) {
            that.playerNinja.hurtSound.play();
        }
        if (!that.playerNinja.alive) {
            that.playerNinja.dieSound.play();
        }
    }
}

phinalphase.updatePlayerNinja = function (that) {
    that.playerNinja.playNinjaSounds();
    that.playerNinja.updateCreature();
    if (that.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        that.playerNinja.act('RIGHT');
    } else if (that.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        that.playerNinja.act('LEFT');
    } else {
        if (!that.playerNinja.isInAir) {
            that.playerNinja.act();
        }
    }
    if (that.playerNinja.body.velocity.y > 0 && that.playerNinja.isInAir) {
        that.playerNinja.act('FALL');
    }
    if (that.game.input.keyboard.isDown(Phaser.Keyboard.UP) && !that.playerNinja.isInAir) {
        that.playerNinja.act('UP');
    }

    if (that.game.input.keyboard.isDown(Phaser.Keyboard.L)) {
        that.playerNinja.act('ATTACK');
    }

    if (that.game.input.keyboard.isDown(Phaser.Keyboard.O)) {
        that.playerNinja.act('SKILL', 0);
    }
    if (that.game.input.keyboard.isDown(Phaser.Keyboard.P)) {
        that.playerNinja.act('SKILL', 1);
    }

}