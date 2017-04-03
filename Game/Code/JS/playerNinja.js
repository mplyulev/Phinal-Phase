function createPlayerNinja(that) {
    var anim = [
        ['idle', 'Idle_', 0, 11, '', 3, 15],
        ['run', 'Run_', 0, 12, '', 3, 15],
        ['jumpStart', 'Jump Start_', 0, 0, '', 3, 15],
        ['jumpAir', 'Jump On Air_', 0, 0, '', 3, 15],
        ['jumpFall', 'Jump Fall_', 0, 11, '', 3, 15],
        ['attack1', 'Attack_', 0, 13, '', 3, 15],
        ['hurt', 'Hurt_', 0, 11, '', 3, 20],
        ['death', 'Death_', 0, 19, '', 3, 20],
        ['block', 'Block Parry_', 0, 19, '', 3, 20]
    ]
    that.playerNinja = new phinalphase.Player(that.game, 250, 350, 'playerNinja', 'Idle_000', 1000, 0.5, 1, anim);
    

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
            that.playerNinja.scale.setTo(1, 1);
            that.playerNinja.body.velocity.x = 250;
            if (that.playerNinja.isInAir) {
                that.playerNinja.play('jumpAir');
            } else {
                that.playerNinja.play('run');
            }
        } else if (that.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            that.playerNinja.scale.setTo(-1, 1);
            that.playerNinja.body.velocity.x = -250;
            if (that.playerNinja.isInAir) {
                that.playerNinja.play('jumpAir');
            } else {
                that.playerNinja.play('run');
            }


        } else {
            if (!that.playerNinja.isInAir) {
                that.playerNinja.play('idle');

            }
        }
        //((that.playerNinja.body.velocity.y > 0 && that.playerNinja.animations.currentAnim.name != 'run') || (that.playerNinja.body.velocity.y > 50 && that.playerNinja.animations.currentAnim.name == 'run')) && !(that.playerNinja.body.velocity.y < 0 && that.playerNinja.animations.currentAnim.name == 'jumpAir') && that.playerNinja.body.velocity.y > 50
        if (that.playerNinja.body.velocity.y > 0) {
            that.playerNinja.play('jumpFall');
        }
        if (that.game.input.keyboard.isDown(Phaser.Keyboard.UP) && !that.playerNinja.isInAir) {
            that.playerNinja.body.velocity.y = -700;
            that.playerNinja.play('jumpStart');

            that.playerNinja.animations.currentAnim.loop = false;
            that.playerNinja.animations.currentAnim.onComplete.add(function () {
                if (that.playerNinja.animations.currentAnim.name == 'jumpStart') {
                    that.playerNinja.play('jumpAir');
                }
            }, that);
        }

        if (that.game.input.keyboard.isDown(Phaser.Keyboard.L) && !that.playerNinja.isAttacking && that.playerNinja.canAttackAgain) {
            // that.playerNinja.anchor.setTo(0.45, 0.65);
            that.playerNinja.isAttacking = true;
            that.playerNinja.canAttackAgain = false;
            // that.playerNinja.body.gravity.y = 0;
            // that.playerNinja.body.velocity.y = 0;
            // if (!that.playerNinja.isInAir) {
            //     that.playerNinja.y -= 18;
            // }
            that.playerNinja.play('attack1');
            // that.playerNinja.body.setSize(28, 11);
            that.playerNinja.body.height = that.playerNinja.height - 11;
            that.playerNinja.body.width = Math.abs(that.playerNinja.width);

            that.playerNinja.animations.currentAnim.loop = false;
            that.playerNinja.animations.currentAnim.onComplete.add(function () {
                if (that.playerNinja.isAttacking) {
                    // that.playerNinja.anchor.setTo(.5, 0.2);


                    that.playerNinja.play('idle');
                    that.playerNinja.body.height = that.playerNinja.height;
                    that.playerNinja.body.width = Math.abs(that.playerNinja.width);
                    that.playerNinja.isAttacking = false;

                    that.playerNinja.canAttackAgain = true;

                    that.playerNinja.body.gravity.y = 1000;
                }

            }, that);
        }
    }

}