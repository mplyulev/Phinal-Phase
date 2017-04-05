function createPlayerNinja(that) {
    var anim = [
        ['idle', 'Idle_', 0, 11, '', 3, 15],
        ['run', 'Run_', 0, 12, '', 3, 15],
        ['jumpStart', 'Jump Start_', 0, 11, '', 3, 15],
        ['jumpAir', 'Jump On Air_', 0, 0, '', 3, 15],
        ['jumpFall', 'Jump Fall_', 0, 0, '', 3, 15],
        ['attack1', 'Attack_', 0, 13, '', 3, 15],
        ['hurt', 'Hurt_', 0, 11, '', 3, 20],
        ['death', 'Death_', 0, 19, '', 3, 20],
        ['block', 'Block Parry_', 0, 19, '', 3, 20]
    ]
    that.playerNinja = new phinalphase.Player(that.game, 250, 350, 'playerNinja', 'Idle_000', 1000, 0.5, 1, -700, 300, anim);
    that.playerNinja.checkWorldBounds = true;
    that.playerNinja.facing = "";
    that.playerNinja.body.collideWorldBounds = true;
    that.playerNinja.jumpSound = that.game.add.audio("jumpSound");
    that.playerNinja.jumpSound.volume = 0.4;
    that.playerNinja.jump = function() {
        that.playerNinja.body.velocity.y = that.playerNinja.jumpHeight;
        that.playerNinja.jumpSound.play();
        that.playerNinja.play('jumpStart', false, function() {
            if (this.animations.currentAnim.name == 'jumpStart') {
                this.play('jumpAir');
            }
        });
    }

    that.playerNinja.moveSides = function(sideNum) {
        that.playerNinja.scale.setTo(sideNum, 1);
        if (sideNum < 0) {
            that.playerNinja.body.velocity.x = -that.playerNinja.speedX;
        } else {
            that.playerNinja.body.velocity.x = that.playerNinja.speedX;
        }
        if (that.playerNinja.isInAir) {
            that.playerNinja.play('jumpAir');
        } else {
            that.playerNinja.play('run');
        }
    }

    that.playerNinja.stay = function() {
        that.playerNinja.play('idle');
    }
}


function updatePlayerNinja(that) {
    that.game.physics.arcade.collide(that.playerNinja, that.blockedLayer, null, null, that);
    that.playerNinja.body.velocity.x = 0;

    if (that.playerNinja.body.blocked.down) {
        that.playerNinja.isInAir = false;
    } else {
        that.playerNinja.isInAir = true;
    }
    if (!that.playerNinja.isAttacking) {
        if (that.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            that.playerNinja.move('RIGHT');
            that.playerNinja.facing = "right";
        } else if (that.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            that.playerNinja.move('LEFT');
            that.playerNinja.facing = "left";
        } else {
            if (!that.playerNinja.isInAir) {
                that.playerNinja.move();
            }
        }
        if (that.playerNinja.body.velocity.y > 0) {
            that.playerNinja.play('jumpFall');
        }
        if (that.game.input.keyboard.isDown(Phaser.Keyboard.UP) && !that.playerNinja.isInAir) {
            that.playerNinja.move('UP');
        }

        if (that.game.input.keyboard.isDown(Phaser.Keyboard.L) && !that.playerNinja.isAttacking && that.playerNinja.canAttackAgain) {
            that.playerNinja.isAttacking = true;
            that.playerNinja.canAttackAgain = false;
            that.playerNinja.play('attack1', false, function() {
                if (that.playerNinja.isAttacking) {
                    that.playerNinja.play('idle');
                    that.playerNinja.isAttacking = false;
                    that.playerNinja.canAttackAgain = true;
                }
            });

        }
    }

}