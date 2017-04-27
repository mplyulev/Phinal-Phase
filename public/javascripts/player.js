var phinalphase = phinalphase || {};

phinalphase.Player = function (player) {
    Phaser.Sprite.call(this, phinalphase.game, player.x, player.y, player.key, player.frame);
    this.game = phinalphase.game;
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(0.5, 1);
    this.health = player.health;
    this.energy = player.energy;
    this.energyRegen = player.energyRegen;
    this.defense = player.defense;
    this.body.gravity.y = player.gravity;
    this.jumpHeight = player.jumpHeight;
    this.speed = player.speed;
    this.isInAir = player.isInAir;
    this.busy = player.busy;
    this.canAttackAgain = player.canAttackAgain;
    this.alive = player.alive;
    this.isFlinched = player.isFlinched;
    this.canBeHitted = player.canBeHitted;
    this.changingOffset = player.changingOffset;
    this.oldCropX = player.oldCropX;
    this.oldCropY = player.oldCropY;
    this.kills = player.kills;
    this.deaths = player.deaths;
    this.score = player.score;
    this.username = player.username;

    if (player.anim) {
        this.animationsObject = player.anim;
        this.addAnimation(player.anim);
    }
    if (player.skills) {
        this.skills = [];
        player.skills.forEach(function (skill) {
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
        phinalphase.players.add(this);
    }


}
phinalphase.Player.prototype = Object.create(Phaser.Sprite.prototype);
phinalphase.Player.prototype.constructor = phinalphase.Player;

phinalphase.Player.prototype.addAnimation = function (animations) {
    for (var key in animations) {
        if (animations.hasOwnProperty(key)) {
            var arr = animations[key];
            this.animationsObject[key] = arr;
            this.animations.add(arr[0], Phaser.Animation.generateFrameNames(arr[1], arr[2], arr[3], arr[4] || '', arr[5] || 0), arr[6] || 15, true);
        }
    }
};

phinalphase.Player.prototype.play = function (animation, looping, cb) {
    var prevAnimName = this.animations.currentAnim.name;
    if ((this.changingOffset && prevAnimName != animation) && !this.busy && !this.isFlinched) {
        return;
    }
    this.animations.play(animation);
    if (prevAnimName == animation) {
        var isSameAnim = true;
    }
    for (var key in this.animationsObject) {
        if (this.animationsObject.hasOwnProperty(key)) {
            var element = this.animationsObject[key];
            if (element[0] === this.animations.currentAnim.name) {
                var cropY = element[7];
                var cropX = element[8];
            }
        }
    }


    var diffX = Math.abs(this.width) - this.body.width;
    var diffY = Math.abs(this.height) - this.body.height;


    if (!isSameAnim) {
        this.changingOffset = true;

        phinalphase.game.time.events.add(0, function () {
            this.changingOffset = false;
        }.bind(this));
        var diffH = this.height - this.body.height;
        diffY += cropY;

        this.body.offset.y = diffY;
        this.y += cropY * -1;

        if (this.body.touching.down) {
            this.y += this.oldCropY;
        }
    }

    this.oldCropY = cropY;


    if (diffX > 0) {
        this.body.offset.x = diffX / 2;
    } else {
        this.body.offset.x = 0;
    }
    this.body.offset.x += cropX;
    this.x += cropX * -1


    this.oldCropX = cropX;

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


phinalphase.Player.prototype.jump = function () {
    this.body.velocity.y = phinalphase.putDeltaSpeed(this.jumpHeight);
    this.play(this.animationsObject.jumpStart[0], false, function () {
        if (this.animations.currentAnim.name == this.animationsObject.jumpStart[0]) {
            this.play(this.animationsObject.jumpAir[0]);
        }
    });
}


phinalphase.Player.prototype.moveSides = function (sideNum) {
    this.scale.setTo(sideNum, 1);
    if (sideNum < 0) {
        this.body.velocity.x = -phinalphase.putDeltaSpeed(this.speed);
    } else {
        this.body.velocity.x = phinalphase.putDeltaSpeed(this.speed);
    }
    if (this.isInAir && this.body.velocity.y <= 0) {
        if (!(this.animationsObject.flyIdle && phinalphase.game.input.keyboard.isDown(Phaser.Keyboard.E))) {
            this.play(this.animationsObject.jumpAir[0]);
        }
    } else if (this.body.velocity.y <= 0 || this.body.touching.down) {
        if (!(this.animationsObject.flyIdle && phinalphase.game.input.keyboard.isDown(Phaser.Keyboard.E))) {
            this.play(this.animationsObject.run[0]);
        }
    }
}

phinalphase.Player.prototype.stay = function () {
    this.play(this.animationsObject.idle[0]);
}

phinalphase.Player.prototype.attack = function () {
    this.busy = true;
    this.play(this.animationsObject.attack[0], false, function () {
        this.play(this.animationsObject.idle[0]);
        this.busy = false;
    });
}

phinalphase.Player.prototype.fall = function () {
    this.play(this.animationsObject.jumpFall[0]);
}

phinalphase.Player.prototype.act = function (act, cause) {
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
        if (this.animationsObject.flyIdle) {
            if ((act == 'FALL' || !act) && phinalphase.game.input.keyboard.isDown(Phaser.Keyboard.E)) {
                return;
            }
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
                this.flinch(cause);
                break;
            case 'DIE':
                this.dying();
                break;
            case 'SKILL':
                this.skills[cause].use();
                break;
            default:
                this.stay();
        }

    }
};

phinalphase.Player.prototype.getHitted = function (dmgDealer) {
    if (dmgDealer.damage - this.defense > 0) {
        this.health -= (dmgDealer.damage - this.defense);
    }
    if (this.health <= 0) {
        if (dmgDealer.kills) {
            dmgDealer.score += 10;
            dmgDealer.kills++;
        } else if (dmgDealer.user) {
            dmgDealer.user.score += 10;
            dmgDealer.user.kills++;
        }
        this.act('DIE');
    }
    this.act('FLINCH', dmgDealer);
};

phinalphase.Player.prototype.flinch = function (dmgDealer) {
    this.busy = false;
    this.isFlinched = true;
    this.canBeHitted = false;
    if (dmgDealer.body) {
        this.body.velocity.y = -phinalphase.putDeltaSpeed(300);

        if (dmgDealer.body.center.x > this.body.center.x) {
            this.body.velocity.x = -phinalphase.putDeltaSpeed(100);
        } else {
            this.body.velocity.x = phinalphase.putDeltaSpeed(100);
        }
    } else {
        this.body.velocity.y = -phinalphase.putDeltaSpeed(100);
        this.body.velocity.x = 0;
    }


    this.play(this.animationsObject.hurt[0], false, function () {
        this.isFlinched = false;

        phinalphase.game.time.events.add(500, function () {
            this.canBeHitted = true;
        }, this);
    });


};

phinalphase.Player.prototype.dying = function () {
    this.alive = false;
    this.deaths++;
    this.score -= 5;
    this.play(this.animationsObject.death[0], false, function () {
        this.kill();
        this.respawn();
    });
};

phinalphase.Player.prototype.Update = function () {
    if (!this.alive) {
        return;
    }
    if (isNaN(this.body.velocity.y)) {
        this.body.velocity.y = phinalphase.putDeltaSpeed(20);
    }
    if (!this.isFlinched) {
        this.body.velocity.x = 0;
    }
    if (this.body.blocked.down || this.body.touching.down) {
        this.isInAir = false;
    } else {
        if (this.animations.currentAnim.name == 'idle') {
            this.play(this.animationsObject.jumpStart[0]);
        }
        this.isInAir = true;
    }
    this.children.forEach(function (skill) {
        if (skill.aura) {
            skill.animations.play(skill.name);
        }
    }, this);

    if (this.energy < 100 && this.energy + this.energyRegen <= 100) {
        this.energy += phinalphase.putDeltaSpeed(this.energyRegen);
    } else if (this.energy < 100) {
        this.energy = 100;
    }

    if (this.body.velocity.y < this.jumpHeight) {
        this.body.velocity.y = phinalphase.putDeltaSpeed(this.jumpHeight);
    }

    if (this.body.velocity.y > Math.abs(this.jumpHeight)) {
        this.body.velocity.y = Math.abs(phinalphase.putDeltaSpeed(this.jumpHeight));
    }
}

phinalphase.Player.prototype.overlapGlitchHandle = function (other) {
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


phinalphase.Player.prototype.respawn = function () {
    phinalphase.game.time.events.add(3000, function () {

        this.alive = true;
        this.children.forEach(function (child) {
            child.children.forEach(function (child2) {
                child2.kill();
            }, this);
            child.kill();
        }, this);
        var spawnCoor = Math.floor(Math.random() * phinalphase.spawns.children.length);
        this.x = phinalphase.spawns.children[spawnCoor].x;
        this.y = phinalphase.spawns.children[spawnCoor].y;
        this.body.velocity.y = 0;
        this.body.velocity.x = 0;
        this.canBeHitted = false;
        this.revive();
        this.energy = 0;
        phinalphase.game.time.events.add(1000, function () {
            this.canBeHitted = true;
        }, this);

    }, this);
}
