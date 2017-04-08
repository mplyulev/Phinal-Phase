function createPlayerNinja(that) {
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
    }
    that.playerNinja = new phinalphase.Player(that.game, 250, 350, 'playerNinja', 'Idle_000', 1000, 0.5, 1, -700, 300, 100, 100, anim);
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
    that.playerNinja.dieSound = new buzz.sound("/assets/Sound/player/die", {
        formats: ["wav"],
        volume: 60,
        preload: true,
    });





    that.playerNinja.playNinjaSounds = function() {
        if (that.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) && !that.playerNinja.isInAir && !that.playerNinja.isAttacking) {
            that.playerNinja.walkingSound.play();
        } else if (that.game.input.keyboard.isDown(Phaser.Keyboard.LEFT) && !that.playerNinja.isInAir && !that.playerNinja.isAttacking) {
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
        if (that.playerNinja.isFlinched) {
            that.playerNinja.hurtSound.play();
        }
        if (!that.playerNinja.alive) {
            that.playerNinja.dieSound.play();
        }
    }
}

function updatePlayerNinja(that) {
    that.playerNinja.playNinjaSounds();
    if (!that.playerNinja.isFlinched) {
        that.playerNinja.body.velocity.x = 0;
    }
    if (that.playerNinja.body.blocked.down) {
        that.playerNinja.isInAir = false;
    } else {
        that.playerNinja.isInAir = true;
    }
    if (that.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        that.playerNinja.act('RIGHT');
    } else if (that.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
        that.playerNinja.act('LEFT');
    } else {
        if (!that.playerNinja.isInAir) {
            that.playerNinja.act();
        }
    }
    if (that.playerNinja.body.velocity.y > 0) {
        that.playerNinja.act('FALL');
    }
    if (that.game.input.keyboard.isDown(Phaser.Keyboard.UP) && !that.playerNinja.isInAir) {
        that.playerNinja.act('UP');
    }

    if (that.game.input.keyboard.isDown(Phaser.Keyboard.L)) {
        that.playerNinja.act('ATTACK');
    }

}