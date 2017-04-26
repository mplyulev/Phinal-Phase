var phinalphase = phinalphase || {};

// phinalphase.createPlayerCop = function (that) {
var animCop = {
    idle: ['idle', 'Idle_', 0, 11, '', 3, 15, 0, 0],
    run: ['run', 'Run_', 0, 13, '', 3, 15, -8, 0],
    jumpStart: ['jumpStart', 'Jump Start_', 0, 19, '', 3, 25, 0, 0],
    jumpAir: ['jumpAir', 'Jump On Air_', 0, 0, '', 3, 15, 0, 0],
    jumpFall: ['jumpFall', 'Jump Fall_', 0, 0, '', 3, 15, 0, 0],
    attack: ['shoot', 'Shoot_', 0, 14, '', 3, 20.2, 0, 0],
    hurt: ['hurt', 'Hurt_', 0, 9, '', 3, 20, 0, 0],
    death: ['death', 'Death_', 0, 14, '', 3, 20, -10, 0],
    flyIdle: ['flyIdle', 'Jetpack Idle_', 0, 11, '', 3, 25, , 0, 0],
    flyForward: ['flyForward', 'Jetpack Fly Forward_', 0, 11, '', 3, 25, 0, 0],
    flyShoot: ['flyShoot', 'Jetpack Fly Shoot_', 0, 11, '', 3, 25, 0, 0],
    flyHurt: ['flyHurt', 'Jetpack Fly Hurt_', 0, 9, '', 3, 25, 0, 0],
    knockback: ['knockback', 'Knockback_', 0, 15, '', 3, 25, -5, 0]
}

var skillsCop = [
    {
        type: 'proj',
        enerReq: 10,
        key: 'bullet',
        frame: 'bullet',
        cooldown: 2,
        userAnim: animCop.attack[0],
        stop: false,
        dmg: 10,
        enemyCollide: '',
        bullet: {
            number: 30,
            speed: 750,
            scaleX: 0.1,
            scaleY: 0.1,
        },
        offsetX: 10,
        offsetY: -30
    },
    {
        type: 'melee',
        enerReq: 10,
        key: undefined,
        frame: undefined,
        cooldown: 0,
        userAnim: animCop.knockback[0],
        stop: false,
        dmg: 5,
        enemyCollide: `
            (function(enemy){
                enemy.body.velocity.y = -phinalphase.putDeltaSpeed(200);;
                if (this.user.scale.x > 0) {
                    enemy.body.velocity.x = phinalphase.putDeltaSpeed(300);
                } else {
                    enemy.body.velocity.x = -phinalphase.putDeltaSpeed(300);;
                }
            }.bind(this))(enemy);
        `,
        weapon: {
            offsetX: 30,
            offsetY: -30,
            height: 20,
            width: 20
        }
    },
    {
        type: 'special',
        enerReq: 0.5,
        key: undefined,
        frame: undefined,
        cooldown: 0,
        userAnim: animCop.flyIdle[0],
        stop: false,
        special: ` (function(that) {
        if (!that.checkEnergy()) {
            return;
        }
        that.user.play(that.userAnim);
        that.user.body.velocity.y -= phinalphase.putDeltaSpeed(23);
        })(this)`
    },



    {
        type: 'special',
        enerReq: 100,
        key: 'splash',
        frame: ['splash', 'groundup', 1, 30, '', 4, 35],
        cooldown: 0,
        userAnim: animCop.jumpFall[0],
        stop: false,
        special: `(function(that) {
            if (!that.user.isInAir) {
                return;
            }
            if (!that.checkEnergy()) {
                return;
            }
            that.user.act('FALL');
            that.user.busy = true;
            var oldJumpHeight = that.user.jumpHeight
            that.user.jumpHeight = -900;

            that.user.body.velocity.y = phinalphase.putDeltaSpeed(900);

            if (that.splash == undefined) {
                that.splash = phinalphase.game.make.sprite(0, that.user.height / 2, that.key);
                that.damage = 30;
                that.splash.aura = false;
                that.splash.anchor.setTo(0.5, 1);
                that.splash.scale.setTo(0.5, 0.5);
                that.splash.name = that.frame[0];
                phinalphase.game.physics.arcade.enable(that.splash);
                that.splash.animations.add(that.frame[0], Phaser.Animation.generateFrameNames(that.frame[1], that.frame[2], that.frame[3], that.frame[4], that.frame[5]), that.frame[6]);
                that.user.addChild(that.splash);
                that.splash.kill();
            }


            var collideFunction = function () {
                phinalphase.game.physics.arcade.overlap(phinalphase.players, that.splash, function (aura, enemy) {
                    if (that.user == enemy) {
                        return;
                    }
                    enemy.act('STRIKED', that);
                }, null, that);
            }.bind(that);
            phinalphase.game.updatables.push(collideFunction);


            var theSplash = function () {
                if (!that.user.isInAir) {
                    that.splash.revive();
                    that.splash.aura = true;
                    that.user.jumpHeight = oldJumpHeight;
                    that.user.busy = false;

                    that.splash.animations.currentAnim.loop = false;
                    that.splash.animations.currentAnim.onComplete.add(function () {
                        that.splash.kill();
                        that.splash.aura = false;
                        that.splash.animations.currentAnim.onComplete._bindings.pop();
                        phinalphase.game.updatables.splice(phinalphase.game.updatables.indexOf(collideFunction), 1);
                    }, that);
                    phinalphase.game.updatables.splice(phinalphase.game.updatables.indexOf(theSplash), 1);
                }
            }.bind(that);

            phinalphase.game.updatables.push(theSplash);
        })(this)`
    }


]


// that.playerCop = new phinalphase.PlayerSecondTeam(that.game, 0, 0, 'playerCop', 'Idle_000', 1000, 0.5, 1, -600, 300, 0.1, 5, anim, skills);
phinalphase.playerCop = {
    x: 0,
    y: 0,
    key: 'playerCop',
    frame: 'Idle_000',
    gravity: 1000,
    jumpHeight: -600,
    speed: 300,
    energyRegen: 0.1,
    defense: 5,
    anim: animCop,
    skills: skillsCop
}

    // that.playerCop.flyForward = function () {
    //     that.playerCop.play(this.animationsObject.flyForward[0]);
    // }


    // that.playerCop.noEnergySound = new buzz.sound("/assets/Sound/powerDrain", {
    //     formats: ["ogg"],
    //     preload: true,
    // });

    // that.playerCop.walkingSound = new buzz.sound("/assets/Sound/footstep04", {
    //     formats: ["ogg"],
    //     volume: 20,
    //     preload: true,
    // });
    // that.playerCop.jetPackSound = new buzz.sound("/assets/Sound/jetpack", {
    //     formats: ["mp3"],
    //     volume: 30,
    //     preload: true,
    // });
    // that.playerCop.hurtSound = new buzz.sound("/assets/Sound//player/pain", {
    //     formats: ["wav"],
    //     volume: 30,
    //     preload: true,
    // });
    // that.playerCop.dieSound = new buzz.sound("/assets/Sound//player/die", {
    //     formats: ["wav"],
    //     volume: 30,
    //     preload: true,
    // });
    // that.playerCop.shootSound = new buzz.sound("/assets/Sound/launches/iceball", {
    //     formats: ["wav"],
    //     preload: true,
    // });
    // that.playerCop.jumpSound = new buzz.sound("/assets/Sound/jump", {
    //     formats: ["mp3"],
    //     preload: true,
    //     volume: 60
    // });
    // that.playerCop.fallingSound = new buzz.sound("/assets/Sound/falling", {
    //     formats: ["ogg"],
    //     preload: true,
    //     volume: 60
    // });
    // that.playerCop.shootSound.setSpeed(2.2);
    // that.playerCop.meleeSound = new buzz.sound("/assets/Sound/meleCop", {
    //     formats: ["wav"],
    //     preload: true,
    //     volume: 60
    // });
    // that.playerCop.healSound = new buzz.sound("/assets/Sound/spell3", {
    //     formats: ["wav"],
    //     preload: true,
    //     volume: 60
    // });





//     that.playerCop.playCopSounds = function () {
//         if (that.game.input.keyboard.isDown(Phaser.Keyboard.D) && !that.playerCop.isInAir && !that.playerCop.busy) {
//             that.playerCop.walkingSound.play();
//         } else if (that.game.input.keyboard.isDown(Phaser.Keyboard.A) && !that.playerCop.isInAir && !that.playerCop.busy) {
//             that.playerCop.walkingSound.play();
//         }
//         if (that.game.input.keyboard.isDown(Phaser.Keyboard.W) && that.playerCop.body.blocked.down) {
//             that.playerCop.jumpSound.play();
//         }
//         if (that.playerCop.isInAir && that.playerCop.body.blocked.down) {
//             that.playerCop.walkingSound.play();
//         }
//         if (that.game.input.keyboard.isDown(Phaser.Keyboard.V)) {
//             that.playerCop.shootSound.play();
//         }
//         if (that.playerCop.energy <= 0.2) {
//             that.playerCop.noEnergySound.play();
//         }
//         if (that.game.input.keyboard.isDown(Phaser.Keyboard.G) && that.playerCop.energy > 0.2) {
//             that.playerCop.jetPackSound.play();
//         }
//         if (that.game.input.keyboard.isDown(Phaser.Keyboard.B)) {
//             that.playerCop.meleeSound.play();
//         }
//         if (that.playerCop.isFlinched) {
//             that.playerCop.hurtSound.play();
//         }
//         if (!that.playerCop.alive) {
//             that.playerCop.dieSound.play();
//         }
//         if (that.playerCop.y > 700) {
//             that.playerCop.fallingSound.play();
//         }
//     }



//     that.playerCop.checkWorldBounds = true;
//     //  that.healthbarShape = null;


// }


// phinalphase.updatePlayerCop = function (that) {
//     that.playerCop.playCopSounds();
//     that.playerCop.updateCreature();
//     if (that.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
//         that.playerCop.act('RIGHT');
//     } else if (that.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
//         that.playerCop.act('LEFT');
//     } else {
//         if (!that.playerCop.isInAir) {
//             that.playerCop.act();
//         }
//     }
//     if (that.playerCop.body.velocity.y > 0 && that.playerCop.isInAir) {
//         that.playerCop.act('FALL');
//     }
//     if (that.game.input.keyboard.isDown(Phaser.Keyboard.W) && !that.playerCop.isInAir) {
//         that.playerCop.act('UP');

//     }
//     if (that.game.input.keyboard.isDown(Phaser.Keyboard.V)) {
//         that.playerCop.act('SKILL', 0);
//     }
//     if (that.game.input.keyboard.isDown(Phaser.Keyboard.G)) {
//         that.playerCop.act('SKILL', 2);
//     }
//     if (that.game.input.keyboard.isDown(Phaser.Keyboard.B)) {
//         that.playerCop.act('SKILL', 1);
//     }
//     if (that.game.input.keyboard.isDown(Phaser.Keyboard.H)) {
//         that.playerCop.act('SKILL', 3);
//     }
//     if (that.game.input.keyboard.isDown(Phaser.Keyboard.G) && that.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
//         that.playerCop.act('FLYFORWARD');
//     }
//     if (that.game.input.keyboard.isDown(Phaser.Keyboard.G) && that.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
//         that.playerCop.scale.setTo(-1, 1);
//         that.playerCop.act('FLYFORWARD');
//     }
// }