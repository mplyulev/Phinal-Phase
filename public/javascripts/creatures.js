var phinalphase = phinalphase || {};


// constructor for creatures

phinalphase.Creature = function (game, x, y, key, frame, gravity, anchorX, anchorY, jumpHeight, speedX, energyRegen, defense, animations, skills) {
    Phaser.Sprite.call(this, game, x, y, key, frame);
    this.game.physics.arcade.enable(this);
    this.health = 100;
    this.energy = 100;
    this.energyRegen = energyRegen;
    this.defense = defense;
    this.body.gravity.y = gravity;
    this.anchor.setTo(anchorX, anchorY);
    this.jumpHeight = jumpHeight;
    this.speedX = speedX;
    this.wasMoving = false;
    this.isInAir = false;
    this.busy = false;
    this.canAttackAgain = true;
    this.alive = true;
    this.isFlinched = false;
    this.canBeHitted = true;
    this.animationsObject = animations;
    this.oldCropY = 0;
    this.oldCropX = 0;
    this.body.checkCollision.up = false;
    if (animations) {
        this.addAnimation(animations);
    }
    if (skills) {
        this.skills = [];
        skills.forEach(function (skill) {
            if (skill.type == 'aurabuff') {
                this.skills.push(new phinalphase.AuraSkillBuff(this, skill.enerReq, skill.key, skill.frame, skill.cooldown, skill.userAnim, skill.stop, skill.duration, skill.anim, skill.effects, skill.afterEffects));
            }
            if (skill.type == 'auradmg') {
                this.skills.push(new phinalphase.AuraSkillDmg(this, skill.enerReq, skill.key, skill.frame, skill.cooldown, skill.userAnim, skill.stop, skill.duration, skill.anim, skill.dmg, skill.enemyCollide));
            }
            if (skill.type == 'proj') {
                this.skills.push(new phinalphase.Projectile(this, skill.enerReq, skill.key, skill.frame, skill.cooldown, skill.userAnim, skill.stop, skill.dmg, skill.enemyCollide, skill.bullet, skill.offsetX, skill.offsetY));
            }
            if (skill.type == 'melee') {
                this.skills.push(new phinalphase.MeleeAttack(this, skill.enerReq, skill.key, skill.frame, skill.cooldown, skill.userAnim, skill.stop, skill.dmg, skill.enemyCollide, skill.weapon));
            }
            if (skill.type == 'block') {
                this.skills.push(new phinalphase.Block(this, skill.enerReq, skill.key, skill.frame, skill.cooldown, skill.userAnim, skill.stop, skill.bonusDefense));
            }
            if (skill.type == 'special') {
                this.skills.push(new phinalphase.Special(this, skill.enerReq, skill.key, skill.frame, skill.cooldown, skill.userAnim, skill.stop, skill.special))
            }


        }, this);
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

phinalphase.Creature.prototype.play = function (animation, looping, cb) {
    if (this.body.velocity.x) {
        this.wasMoving = true;
    } else {
        this.wasMoving = false;
    }

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
    if (this.body.touching.down || this.body.touching.right) {
        this.body.height += this.oldCropY;
        this.y -= this.oldCropY;

        this.body.width += cropX;
        this.x -= cropX;
    }


    this.oldCropY = cropY || 0;
    this.oldCropX = cropX || 0;

    if (cropY != undefined) {
        this.body.height = (this.height - cropY);
        this.y += cropY;
    } else {
        this.body.height = this.height;
    }
    var diff = Math.abs(this.width) - this.body.width;

    if (diff > 0) {
        this.body.offset.setTo(diff / 2, 0);
    } else {
        this.body.offset.setTo(0, 0);
    }


    // if (cropX != undefined) {
    //     if (cropX <= 0) {
    //         this.body.width = (Math.abs(this.width) - cropX);
    //         this.x += cropX;
    //     } else {
    //         this.body.width = (Math.abs(this.width) + cropX);
    //     }

    // } else {
    //     this.body.width = Math.abs(this.width);
    // }

    if (looping === false) {
        this.animations.currentAnim.loop = false;
        this.animations.currentAnim.onComplete.add(cb, this);
        var current = {
            anim: this.animations.currentAnim.onComplete,
            cb: cb,
            clearBind: clearBind
        }
        var clearBind = function () {
            this.anim._bindings.splice(this.anim._bindings.indexOf(this.cb), 1);
            this.anim._bindings.splice(this.anim._bindings.indexOf(this.clearBind), 1);
        }.bind(current);
        this.animations.currentAnim.onComplete.add(clearBind, this);
    }
};


phinalphase.Creature.prototype.jump = function () {
    this.body.velocity.y = this.jumpHeight;
    this.play(this.animationsObject.jumpStart[0], false, function () {
        if (this.animations.currentAnim.name == this.animationsObject.jumpStart[0]) {
            this.play(this.animationsObject.jumpAir[0]);
        }
    });
}


phinalphase.Creature.prototype.moveSides = function (sideNum) {
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

phinalphase.Creature.prototype.stay = function () {
    this.play(this.animationsObject.idle[0]);
}

phinalphase.Creature.prototype.attack = function () {
    this.busy = true;
    this.play(this.animationsObject.attack[0], false, function () {
        this.play(this.animationsObject.idle[0]);
        this.busy = false;
    });
}

phinalphase.Creature.prototype.fall = function () {
    this.play(this.animationsObject.jumpFall[0]);
}

phinalphase.Creature.prototype.act = function (act, cause) {
    if (this.alive) {

        if (act != 'DIE' && this.isFlinched) {
            return;
        }

        if ((act != 'STRIKED' && act != 'DIE' && act != 'FLINCH') && this.busy) {
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
            case 'FLYFORWARD':
                this.flyForward();
                break;
            case 'SKILL':
                this.skills[cause].use();
                break;
            default:
                this.stay();
        }

    }
};

phinalphase.Creature.prototype.getHitted = function (dmgDealer) {
    if (dmgDealer.damage - this.defense > 0) {
        this.health -= (dmgDealer.damage - this.defense);
    }
    if (this.health <= 0) {
        this.act('DIE');
    }
    this.act('FLINCH');
};

phinalphase.Creature.prototype.flinch = function () {
    this.busy = false;
    this.isFlinched = true;
    this.canBeHitted = false;
    this.body.velocity.y = -300;
    if (this.scale.x <= 0) {
        this.body.velocity.x = 100;
    } else {
        this.body.velocity.x = -100;
    }

    this.play(this.animationsObject.hurt[0], false, function () {
        this.isFlinched = false;

        phinalphase.game.time.events.add(500, function () {
            this.canBeHitted = true;
        }, this);
    });


};

phinalphase.Creature.prototype.dying = function () {
    this.alive = false;
    this.play(this.animationsObject.death[0], false, function () {
        this.kill();
        this.alive = true;
        phinalphase.game.time.events.add(3000, function () {
            this.revive();
        }, this);
    });
};

phinalphase.Creature.prototype.updateCreature = function () {
    if (isNaN(this.body.velocity.y)) {
        this.body.velocity.y = 20;
    }
    if (!this.isFlinched) {
        this.body.velocity.x = 0;
    }
    if (this.body.blocked.down || this.body.touching.down) {
        this.isInAir = false;
    } else {
        this.isInAir = true;
    }
    this.children.forEach(function (skill) {
        if (skill.aura) {
            skill.animations.play(skill.name);
        }
    }, this);

    if (this.energy < 100 && this.energy + this.energyRegen <= 100) {
        this.energy += this.energyRegen;
    } else if (this.energy < 100) {
        this.energy = 100;
    }
}

phinalphase.Creature.prototype.overlapGlitchHandle = function (other) {
    var overlap = Math.abs(this.body.overlapX);
    var backOverlap = Math.abs(Math.abs(this.body.overlapX) - (Math.abs(other.width) + Math.abs(this.width)));
    if (other.body.touching.up) {
        overlap *= 1.5;
        backOverlap *= 1.5;
    }
    if (!this.body.touching.down && this.body.overlapX != 0) {
        if (this.x > other.x) {

            if (this.scale.x > 0) {
                other.body.velocity.x -= backOverlap;
            } else {
                other.body.velocity.x -= overlap;
            }
        } else {
            if (this.scale.x > 0) {
                other.body.velocity.x += overlap;
            } else {
                other.body.velocity.x += backOverlap;
            }
        }

    }

}




phinalphase.Player = function (game, x, y, key, frame, gravity, anchorX, anchorY, jumpHeight, speedX, energyRegen, defense, animations, skills) {
    phinalphase.Creature.apply(this, arguments);
    if (phinalphase.players != undefined) {
        phinalphase.players.add(this);
    } else {
        phinalphase.players = phinalphase.game.add.group();
        phinalphase.players.add(this);
    }
}


phinalphase.Player.prototype = Object.create(phinalphase.Creature.prototype);
phinalphase.Player.prototype.constructor = phinalphase.Player;

phinalphase.Player.prototype.flyForward = function () {
    this.play(this.animationsObject.flyForward[0]);
}




phinalphase.Enemy = function (game, x, y, key, frame, gravity, anchorX, anchorY, jumpHeight, speedX, energyRegen, defense, animations, skills) {
    phinalphase.Creature.apply(this, arguments);
    if (phinalphase.enemies != undefined) {
        phinalphase.enemies.add(this);
    } else {
        phinalphase.enemies = phinalphase.game.add.group();
        phinalphase.enemies.add(this);
    }
}
phinalphase.Enemy.prototype = Object.create(phinalphase.Creature.prototype);
phinalphase.Enemy.prototype.constructor = phinalphase.Enemy;