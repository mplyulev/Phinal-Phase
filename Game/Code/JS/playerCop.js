function createPlayerCop(that) {
    that.playerCop = that.game.add.sprite(50, 250, 'playerCop', 'Idle_000');
    weapon = that.game.add.weapon(30, "bullet")
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 600;
    weapon.trackSprite(that.playerCop, 5, -10, false);
    weapon.fireRate = 400;
    weapon.bullets.forEach((b) => {
        b.scale.setTo(0.05, 0.05);
        b.body.updateBounds();
    }, that);
    that.playerCop.bullets = 20;
    that.playerCop.energy = 100;
    that.playerCop.health = 100;
    that.playerCop.facing = "";
    that.game.physics.arcade.enable(that.playerCop);
    that.playerCop.body.gravity.y = 1000;
    that.game.camera.follow(that.playerCop);
    that.playerCop.anchor.setTo(0.5, 1);
    that.playerCop.isInAir = false;
    that.playerCop.isAttacking = false;
    that.playerCop.body.collideWorldBounds = true;
    // that.playerCop.body.maxVelocity.set(500);

    that.playerCop.animations.add('idle', Phaser.Animation.generateFrameNames('Idle_', 0, 11, '', 3), 15, true);
    that.playerCop.animations.add('run', Phaser.Animation.generateFrameNames('Run_', 0, 13, '', 3), 15, true);
    that.playerCop.animations.add('jumpStart', Phaser.Animation.generateFrameNames('Jump Start_', 0, 9, '', 3), 25, true);
    that.playerCop.animations.add('jumpAir', Phaser.Animation.generateFrameNames('Jump On Air_', 0, 0, '', 3), 15, true);
    that.playerCop.animations.add('jumpFall', Phaser.Animation.generateFrameNames('Jump Fall_', 0, 0, '', 3), 15, true);
    that.playerCop.animations.add('shoot', Phaser.Animation.generateFrameNames('Shoot_', 0, 14, '', 3), 25, true);
    that.playerCop.animations.add('knockback', Phaser.Animation.generateFrameNames('Knockback_', 0, 15, '', 3), 25, true);
    that.playerCop.animations.add('hurt', Phaser.Animation.generateFrameNames('Hurt_', 0, 9, '', 3), 25, true);
    that.playerCop.animations.add('death', Phaser.Animation.generateFrameNames('Death_', 0, 14, '', 3), 25, true);
    that.playerCop.animations.add('flyIdle', Phaser.Animation.generateFrameNames('Jetpack Idle_', 0, 11, '', 3), 25, true);
    that.playerCop.animations.add('flyForward', Phaser.Animation.generateFrameNames('Jetpack Fly Forward_', 0, 11, '', 3), 25, true);
    that.playerCop.animations.add('flyShoot', Phaser.Animation.generateFrameNames('Jetpack Fly Shoot_', 0, 11, '', 3), 25, true);
    that.playerCop.animations.add('flyHurt', Phaser.Animation.generateFrameNames('Jetpack Fly Hurt_', 0, 9, '', 3), 25, true);

    // that.playerCop.animations.add('flyDownDust', Phaser.Animation.generateFrameNames('groundup000', 0, 30, '', 3), 25, true);

}

function updatePlayerCop(that) {
    that.game.physics.arcade.collide(that.playerCop, that.blockedLayer, null, null, that);
    that.playerCop.body.velocity.x = 0;
    that.game.physics.arcade.collide(weapon.bullets, that.blockedLayer, null, null, that);
    weapon.bullets.forEach(function(bullet) {
        if (bullet.body.velocity.x == 0 && bullet.body.velocity.y == 0) {
            bullet.kill();
        }
    })


    if (that.playerCop.body.blocked.down) {
        that.playerCop.isInAir = false;
    } else {
        that.playerCop.isInAir = true;
    }
    if (!that.playerCop.isAttacking) {


        if (that.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            that.playerCop.facing = "right";
            that.playerCop.scale.setTo(1, 1);
            that.playerCop.body.velocity.x = 250;
            if (!that.playerCop.isInAir) {
                that.playerCop.animations.play('run');
            } else {
                // that.playerCop.animations.play('jumpAir');
            }
        } else if (that.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            that.playerCop.facing = "left";
            that.playerCop.scale.setTo(-1, 1);
            that.playerCop.body.velocity.x = -250;
            if (!that.playerCop.isInAir) {
                that.playerCop.animations.play('run');
            } else {
                // that.playerCop.animations.play('jumpAir');
            }


        } else {
            if (!that.playerCop.isInAir && that.playerCop.animations.currentAnim.name != 'shoot') {
                that.playerCop.animations.play('idle');
                that.playerCop.body.height = that.playerCop.height;

            }
        }

        if (that.playerCop.body.velocity.y > 200) {

            that.playerCop.animations.play('jumpFall');
        }
        // console.log(that.playerCop.body.velocity.y);


        if (that.game.input.keyboard.isDown(Phaser.Keyboard.W) && that.playerCop.body.blocked.down) {
            that.playerCop.body.velocity.y = -550;
            that.playerCop.animations.play('jumpStart');
            that.playerCop.animations.currentAnim.loop = false;
            that.playerCop.animations.currentAnim.onComplete.add(function() { that.playerCop.animations.play('jumpAir'); }, that);
        }
        // }

        if (that.game.input.keyboard.isDown(Phaser.Keyboard.V)) {


            if (that.playerCop.bullets > 0) {

                var currentY = that.playerCop.body.height;

                that.playerCop.animations.play("shoot");

                that.playerCop.body.height = that.playerCop.height;



                that.playerCop.animations.currentAnim.loop = false;
                that.playerCop.animations.currentAnim.onComplete.add(function() {
                    that.playerCop.animations.play("idle");
                    that.playerCop.body.height = that.playerCop.height;
                })
                if (that.playerCop.facing === "left") {
                    // that.playerCop.y -= 3;
                    weapon.fireAngle = Phaser.ANGLE_LEFT;
                    weapon.fire();
                }
                if (that.playerCop.facing === "right") {
                    weapon.fireAngle = Phaser.ANGLE_RIGHT;
                    weapon.fire();
                    console.log("asdas");
                    // that.playerCop.y -= 23;
                }
            }
        }



        if (that.game.input.keyboard.isDown(Phaser.Keyboard.B)) {
            that.playerCop.animations.play("knockback");
            that.playerCop.y -= 3;


        }
        if (that.game.input.keyboard.isDown(Phaser.Keyboard.G)) {
            console.log(that.playerCop.energy);
            if (that.playerCop.energy > 0.2) {
                that.playerCop.energy -= 0.2;
                console.log(that.playerCop.energy);
                that.playerCop.animations.play("flyIdle");
                that.playerCop.body.velocity.y -= 23;
            }
        }

        if (that.game.input.keyboard.isDown(Phaser.Keyboard.G) && that.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            that.playerCop.animations.play("flyForward");
        }
        if (that.game.input.keyboard.isDown(Phaser.Keyboard.G) && that.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            that.playerCop.scale.setTo(-1, 1);
            that.playerCop.animations.play("flyForward");
        }
    }

}