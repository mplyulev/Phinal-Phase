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
    if (animations) {
        this.addAnimation(animations);
    }
    this.game.add.existing(this);
    phinalphase.creatures.add(this);
}
phinalphase.Creature.prototype = Object.create(Phaser.Sprite.prototype);
phinalphase.Creature.prototype.constructor = phinalphase.Creature;

phinalphase.Creature.prototype.addAnimation = function(animations) {
    for (var index = 0; index < animations.length; index++) {
        var arr = animations[index];
        this.animations.add(arr[0], Phaser.Animation.generateFrameNames(arr[1], arr[2], arr[3], arr[4] || '', arr[5] || 0), arr[6] || 15, true);
    }

};

phinalphase.Creature.prototype.play = function(animation, looping, cb) {
    this.animations.play(animation);

    this.body.height = this.height;
    this.body.width = Math.abs(this.width);
    if (looping === false) {

        this.animations.currentAnim.loop = false;
        this.animations.currentAnim.onComplete.add(cb, this);
    }

};


phinalphase.Creature.prototype.move = function(direction) {
    switch (direction) {
        case 'UP':
            this.jump();
            break;
        case 'LEFT':
            this.moveSides(-1);
            break;
        case 'RIGHT':
            this.moveSides(1);
            break;
        default:
            this.stay();
    }
};


phinalphase.Player = function(game, x, y, key, frame, gravity, anchorX, anchorY, jumpHeight, speedX, animations) {
    phinalphase.Creature.call(this, game, x, y, key, frame, gravity, anchorX, anchorY, jumpHeight, speedX, animations);
    // game.camera.follow(this);
    phinalphase.players.add(this);
    game.add.existing(this);

}
phinalphase.Player.prototype = Object.create(phinalphase.Creature.prototype);
phinalphase.Player.prototype.constructor = phinalphase.Player;


phinalphase.Enemy = function(game, x, y, key, frame, gravity, anchorX, anchorY, jumpHeight, speedX, animations) {
    phinalphase.Creature.call(this, game, x, y, key, frame, gravity, anchorX, anchorY, jumpHeight, speedX, animations);
    game.add.existing(this);
    phinalphase.enemies.add(this);
}
phinalphase.Enemy.prototype = Object.create(phinalphase.Creature.prototype);
phinalphase.Enemy.prototype.constructor = phinalphase.Enemy;