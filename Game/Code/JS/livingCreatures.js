var phinalphase = phinalphase || {};

phinalphase.creatures = [];

// constructor for creatures

phinalphase.Creature = function (game, x, y, key, frame, gravity, anchorX, anchorY, animations) {
    Phaser.Sprite.call(this, game, x, y, key, frame);
    this.game.physics.arcade.enable(this);
    this.body.gravity.y = gravity;
    this.anchor.setTo(anchorX, anchorY);
    this.isInAir = false;
    this.isAttacking = false;
    this.canAttackAgain = true;
    if (animations) {
        this.addAnimation(animations);
    }
    this.game.add.existing(this);
}
phinalphase.Creature.prototype = Object.create(Phaser.Sprite.prototype);
phinalphase.Creature.prototype.constructor = phinalphase.Creature;

phinalphase.Creature.prototype.addAnimation = function (animations) {
    for (var index = 0; index < animations.length; index++) {
        var arr = animations[index];
        this.animations.add(arr[0], Phaser.Animation.generateFrameNames(arr[1], arr[2], arr[3], arr[4] || '', arr[5] || 0), arr[6] || 15, true);
    }

};

phinalphase.Creature.prototype.play = function (animation) {
    // Phaser.AnimationManager.prototype.play.call(this.animations, animation);
    this.animations.play(animation);

    this.body.height = this.height;
    this.body.width = Math.abs(this.width);
};


phinalphase.Player = function (game, x, y, key, frame, gravity, anchorX, anchorY, animations) {
    phinalphase.Creature.call(this, game, x, y, key, frame, gravity, anchorX, anchorY, animations);
    game.camera.follow(this);
    game.add.existing(this);
}
phinalphase.Player.prototype = Object.create(phinalphase.Creature.prototype);
phinalphase.Player.prototype.constructor = phinalphase.Player;



