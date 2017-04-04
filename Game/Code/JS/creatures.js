var phinalphase = phinalphase || {};


// constructor for creatures

phinalphase.Creature = function(game, x, y, key, frame, gravity, anchorX, anchorY, jumpHeight, speedX, animations) {
    Phaser.Sprite.call(this, game, x, y, key, frame);
    this.game.physics.arcade.enable(this);
    this.body.gravity.y = gravity;
    this.anchor.setTo(anchorX, anchorY);
    this.jumpHeight = jumpHeight;
    this.speedX = speedX;
    this.isInAir = false;
    this.isAttacking = false;
    this.canAttackAgain = true;
    this.alive = true;
    this.isFlinched = false;
    this.animationsObject = animations;
    if (animations) {
        this.addAnimation(animations);
    }

}
phinalphase.Creature.prototype = Object.create(Phaser.Sprite.prototype);
phinalphase.Creature.prototype.constructor = phinalphase.Creature;

phinalphase.Creature.prototype.addAnimation = function (animations) {
    for (var key in animations) {
        if (animations.hasOwnProperty(key)) {
            var arr = animations[key];
            this.animationsObject[key] = arr;
            this.animations.add(arr[0], Phaser.Animation.generateFrameNames(arr[1], arr[2], arr[3], arr[4] || '', arr[5] || 0), arr[6] || 15, true);
        }
    }
};

phinalphase.Creature.prototype.play = function(animation, looping, cb) {
    this.animations.play(animation);
    for (var key in this.animationsObject) {
        if (this.animationsObject.hasOwnProperty(key)) {
            var element = this.animationsObject[key];
            if (element[0] === this.animations.currentAnim.name) {
                var cropY = element[7];
                var cropX = element[8];
            }
        }
    }
    if (cropY != undefined) {
        this.body.height = (this.height - cropY);
        this.y += cropY;
    } else {
        this.body.height = this.height;
    }
    if (cropX != undefined) {
        if (cropX <= 0) {
            this.body.width = (Math.abs(this.width) - cropX);
            this.x += cropX;
        } else {
            this.body.width = (Math.abs(this.width) + cropX);
        }

    } else {
        this.body.width = Math.abs(this.width);
    }

    if (looping === false) {

        this.animations.currentAnim.loop = false;
        this.animations.currentAnim.onComplete.add(cb, this);
    }

};


phinalphase.Creature.prototype.act = function (direction) {
    if (this.alive && !this.isAttacking && !this.isFlinched) {
        switch (direction) {
            case 'UP': this.jump(); break;
            case 'LEFT': this.moveSides(-1); break;
            case 'RIGHT': this.moveSides(1); break;
            case 'ATTACK': this.attack(); break;
            case 'FALL': this.fall(); break;
            default: this.stay();
        }
    }
};

phinalphase.Creature.prototype.getHitted = function (dmgDealer) {
    this.dying();
};

phinalphase.Creature.prototype.dying = function (dmgDealer) {
    this.alive = false;
    this.play(this.animationsObject.death[0], false, function () {
        this.kill();
    });
};


phinalphase.Player = function(game, x, y, key, frame, gravity, anchorX, anchorY, jumpHeight, speedX, animations) {
    phinalphase.Creature.call(this, game, x, y, key, frame, gravity, anchorX, anchorY, jumpHeight, speedX, animations);
    // game.camera.follow(this);
    if (phinalphase.players != undefined) {
        phinalphase.players.add(this);
    } else {
        phinalphase.players = phinalphase.game.add.group();
        phinalphase.players.add(this);
    }

}
phinalphase.Player.prototype = Object.create(phinalphase.Creature.prototype);
phinalphase.Player.prototype.constructor = phinalphase.Player;


phinalphase.Enemy = function(game, x, y, key, frame, gravity, anchorX, anchorY, jumpHeight, speedX, animations) {
    phinalphase.Creature.call(this, game, x, y, key, frame, gravity, anchorX, anchorY, jumpHeight, speedX, animations);
    game.add.existing(this);
    if (phinalphase.enemies != undefined) {
        phinalphase.enemies.add(this);
    } else {
        phinalphase.enemies = phinalphase.game.add.group();
        phinalphase.enemies.add(this);
    }
}
phinalphase.Enemy.prototype = Object.create(phinalphase.Creature.prototype);
phinalphase.Enemy.prototype.constructor = phinalphase.Enemy;