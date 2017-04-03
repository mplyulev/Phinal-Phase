function createPlayerNinja(that) {
    that.playerNinja = that.game.add.sprite(250, 350, 'playerNinja', 'Idle_000');
    that.game.physics.arcade.enable(that.playerNinja);
    that.playerNinja.body.gravity.y = 1000;
    that.game.camera.follow(that.playerNinja);
    that.playerNinja.anchor.setTo(0.5, 0.5);
    that.playerNinja.isInAir = false;
    that.playerNinja.isAttacking = false;
    that.playerNinja.canAttackAgain = true;
    // that.playerNinja.inCombo = false;


    // console.log(Phaser.Animation);
    that.playerNinja.animations.add('idle', Phaser.Animation.generateFrameNames('Idle_', 0, 11, '', 3), 15, true);
    that.playerNinja.animations.add('run', Phaser.Animation.generateFrameNames('Run_', 0, 12, '', 3), 15, true);
    that.playerNinja.animations.add('jumpStart', Phaser.Animation.generateFrameNames('Jump Start_', 0, 9, '', 3), 25, true);
    that.playerNinja.animations.add('jumpAir', Phaser.Animation.generateFrameNames('Jump On Air_', 0, 0, '', 3), 15, true);
    that.playerNinja.animations.add('jumpFall', Phaser.Animation.generateFrameNames('Jump Fall_', 0, 0, '', 3), 15, true);
    that.playerNinja.animations.add('attack1', Phaser.Animation.generateFrameNames('Attack_', 0, 13, '', 3), 15, true);
    that.playerNinja.animations.add('hurt', Phaser.Animation.generateFrameNames('Hurt_', 0, 11, '', 3), 20, true);
    that.playerNinja.animations.add('death', Phaser.Animation.generateFrameNames('Death_', 0, 19, '', 3), 20, true);
    that.playerNinja.animations.add('block', Phaser.Animation.generateFrameNames('Block Parry_', 0, 19, '', 3), 20, true);
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
                that.playerNinja.animations.play('jumpAir');
            } else {
                that.playerNinja.animations.play('run');
            }
        } else if (that.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            that.playerNinja.scale.setTo(-1, 1);
            that.playerNinja.body.velocity.x = -250;
            if (that.playerNinja.isInAir) {
                that.playerNinja.animations.play('jumpAir');
            } else {
                that.playerNinja.animations.play('run');
            }


        } else {
            if (!that.playerNinja.isInAir) {
                that.playerNinja.animations.play('idle');

            }
        }
        //((that.playerNinja.body.velocity.y > 0 && that.playerNinja.animations.currentAnim.name != 'run') || (that.playerNinja.body.velocity.y > 50 && that.playerNinja.animations.currentAnim.name == 'run')) && !(that.playerNinja.body.velocity.y < 0 && that.playerNinja.animations.currentAnim.name == 'jumpAir') && that.playerNinja.body.velocity.y > 50
        if (that.playerNinja.body.velocity.y > 50) {
            that.playerNinja.animations.play('jumpFall');
        }

        if (that.game.input.keyboard.isDown(Phaser.Keyboard.UP) && !that.playerNinja.isInAir) {
            that.playerNinja.body.velocity.y = -700;
            that.playerNinja.animations.play('jumpStart');
            that.playerNinja.animations.currentAnim.loop = false;
            that.playerNinja.animations.currentAnim.onComplete.add(function () {
                if (that.playerNinja.animations.currentAnim.name == 'jumpStart') {
                    that.playerNinja.animations.play('jumpAir');
                }
            }, that);
        }

        if (that.game.input.keyboard.isDown(Phaser.Keyboard.L) && !that.playerNinja.isAttacking && that.playerNinja.canAttackAgain) {
            that.playerNinja.anchor.setTo(0.45, 0.65);
            that.playerNinja.isAttacking = true;
            that.playerNinja.canAttackAgain = false;
            var currentHeight = that.playerNinja.body.height;
            var currentWidth = that.playerNinja.body.width;
            // that.playerNinja.body.gravity.y = 0;
            // that.playerNinja.body.velocity.y = 0;
            // if (!that.playerNinja.isInAir) {
            //     that.playerNinja.y -= 18;
            // }
            console.log(that.playerNinja.body.height);
            that.playerNinja.animations.play('attack1');
            // that.playerNinja.body.setSize(28, 11);
            that.playerNinja.body.height = that.playerNinja.height - 11;
            that.playerNinja.body.width = Math.abs(that.playerNinja.width);

            that.playerNinja.animations.currentAnim.loop = false;
            that.playerNinja.animations.currentAnim.onComplete.add(function () {
                if (that.playerNinja.isAttacking) {
                    that.playerNinja.anchor.setTo(.5, 0.2);
                    that.playerNinja.body.height = currentHeight;
                    that.playerNinja.body.width = currentWidth;

                    that.playerNinja.animations.play('idle');
                    // if (that.playerNinja.isInAir) {

                    //     that.playerNinja.y += 18;
                    // }
                    that.playerNinja.isAttacking = false;

                    that.playerNinja.canAttackAgain = true;

                    that.playerNinja.body.gravity.y = 1000;
                }

            }, that);
        }
    }

}