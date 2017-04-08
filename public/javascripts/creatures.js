var phinalphase = phinalphase || {};


// constructor for creatures

phinalphase.Creature = function(game, x, y, key, frame, gravity, anchorX, anchorY, jumpHeight, speedX, health, animations) {
    Phaser.Sprite.call(this, game, x, y, key, frame);
    this.game.physics.arcade.enable(this);
    this.health = health;
    this.body.gravity.y = gravity;
    this.anchor.setTo(anchorX, anchorY);
    this.jumpHeight = jumpHeight;
    this.speedX = speedX;
    this.isInAir = false;
    this.isAttacking = false;
    this.canAttackAgain = true;
    this.alive = true;
    this.isFlinched = false;
    this.canBeHitted = true;
    this.animationsObject = animations;
    if (animations) {
        this.addAnimation(animations);
    }

}
phinalphase.Creature.prototype = Object.create(Phaser.Sprite.prototype);
phinalphase.Creature.prototype.constructor = phinalphase.Creature;

phinalphase.Creature.prototype.addAnimation = function(animations) {
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


phinalphase.Creature.prototype.jump = function() {
    this.body.velocity.y = this.jumpHeight;
    this.play(this.animationsObject.jumpStart[0], false, function() {
        if (this.animations.currentAnim.name == this.animationsObject.jumpStart[0]) {
            this.play(this.animationsObject.jumpAir[0]);
        }
    });
}


phinalphase.Creature.prototype.moveSides = function(sideNum) {
    this.scale.setTo(sideNum, 1);
    if (sideNum < 0) {
        this.body.velocity.x = -this.speedX;
    } else {
        this.body.velocity.x = this.speedX;
    }
    if (this.isInAir) {
        this.play(this.animationsObject.jumpAir[0]);
    } else {
        this.play(this.animationsObject.run[0]);
    }
}

phinalphase.Creature.prototype.stay = function() {
    this.play(this.animationsObject.idle[0]);
}

phinalphase.Creature.prototype.attack = function() {
    this.isAttacking = true;
    this.play(this.animationsObject.attack[0], false, function() {
        this.play(this.animationsObject.idle[0]);
        this.isAttacking = false;
    });
}

phinalphase.Creature.prototype.fall = function() {
    this.play(this.animationsObject.jumpFall[0]);
}

phinalphase.Creature.prototype.act = function(act, cause) {
    if (this.alive) {

        if (act != 'DIE' && this.isFlinched) {
            return;
        }

        if ((act != 'STRIKED' && act != 'DIE' && act != 'FLINCH') && this.isAttacking) {
            return;
        }

        if (act == 'STRIKED' && !this.canBeHitted) {
            return;
        }

        switch (act) {

            case 'UP':
                this.jump();
                break;
            case 'LEFT':
                this.moveSides(-1);
                break;
            case 'RIGHT':
                this.moveSides(1);
                break;
            case 'ATTACK':
                this.attack();
                break;
            case 'FALL':
                this.fall();
                break;
            case 'STRIKED':
                this.getHitted(cause);
                break;
            case 'FLINCH':
                this.flinch();
                break;
            case 'DIE':
                this.dying();
                break;
            case 'FLY':
                this.fly();
                break;
            case 'KNOCKBACK':
                this.knockback();
                break;
            case 'FLYFORWARD':
                this.flyForward();
                break;
            default:
                this.stay();
        }

    }
};

phinalphase.Creature.prototype.getHitted = function(dmgDealer) {
    this.health -= dmgDealer.dmg;
    if (this.health <= 0) {
        this.act('DIE');
    }
    this.act('FLINCH');
};

phinalphase.Creature.prototype.flinch = function() {
    this.isAttacking = false;
    this.isFlinched = true;
    this.canBeHitted = false;
    this.body.velocity.y = -300;
    if (this.scale.x <= 0) {
        this.body.velocity.x = 100;
    } else {
        this.body.velocity.x = -100;
    }

    this.play(this.animationsObject.hurt[0], false, function() {
        this.isFlinched = false;

        phinalphase.game.time.events.add(500, function() {
            this.canBeHitted = true;
        }, this);
    });


};

phinalphase.Creature.prototype.dying = function() {
    this.alive = false;
    this.play(this.animationsObject.death[0], false, function() {
        this.kill();
        this.alive = true;
        phinalphase.game.time.events.add(3000, function() {
            this.revive();
        }, this);
    });
};



phinalphase.Player = function(game, x, y, key, frame, gravity, anchorX, anchorY, jumpHeight, speedX, health, energy, animations) {
    phinalphase.Creature.call(this, game, x, y, key, frame, gravity, anchorX, anchorY, jumpHeight, speedX, health, animations);
    this.energy = energy;
    if (phinalphase.players != undefined) {
        phinalphase.players.add(this);
    } else {
        phinalphase.players = phinalphase.game.add.group();
        phinalphase.players.add(this);
    }
}


phinalphase.Player.prototype = Object.create(phinalphase.Creature.prototype);
phinalphase.Player.prototype.constructor = phinalphase.Player;

phinalphase.Player.prototype.fly = function() {
    this.play(this.animationsObject.flyIdle[0]);
    if (this.energy > 0.2) {
        this.energy -= 0.2;
        this.animations.play("flyIdle");
        this.body.velocity.y -= 23;
    }
}
phinalphase.Player.prototype.knockback = function() {
    this.play(this.animationsObject.knockback[0]);
}
phinalphase.Player.prototype.flyForward = function() {
    this.play(this.animationsObject.flyForward[0]);
}




phinalphase.Enemy = function(game, x, y, key, frame, gravity, anchorX, anchorY, jumpHeight, speedX, health, animations) {
    phinalphase.Creature.call(this, game, x, y, key, frame, gravity, anchorX, anchorY, jumpHeight, speedX, health, animations);
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