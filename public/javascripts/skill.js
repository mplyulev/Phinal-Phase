var phinalphase = phinalphase || {};

phinalphase.Skill = function (user, energyReq, key, frame, cooldown, userAnim, stop) {
    this.user = user;
    this.energyReq = energyReq;
    this.key = key;
    this.frame = frame;
    this.cooldown = cooldown;
    this.userAnim = userAnim;
    this.stop = stop;

    if (this.user instanceof phinalphase.Player) {
        this.userEnemy = 'enemies';
    } else {
        this.userEnemy = 'players';
    }

};

phinalphase.Attack = function (user, energyReq, key, frame, cooldown, userAnim, stop, dmg, enemyCollide) {
    phinalphase.Skill.call(this, user, energyReq, key, frame, cooldown, userAnim, stop);
    this.damage = dmg;
    this.enemyCollide = enemyCollide;
}

phinalphase.Attack.prototype = Object.create(phinalphase.Skill.prototype);
phinalphase.Attack.prototype.constructor = phinalphase.Attack;

phinalphase.Buff = function (user, energyReq, key, frame, cooldown, userAnim, stop, duration, effects, afterEffects) {
    phinalphase.Skill.call(this, user, energyReq, key, frame, cooldown, userAnim, stop);
    this.isOnCD = false;
    this.duration = duration;
    this.effects = effects;
    this.afterEffects = afterEffects;
}

phinalphase.Buff.prototype = Object.create(phinalphase.Skill.prototype);
phinalphase.Buff.prototype.constructor = phinalphase.Buff;


phinalphase.AuraSkill = function (user, energyReq, key, frame, cooldown, userAnim, stop, duration, anim, effects, afterEffects, dmg, enemyCollide) {
    if (this instanceof phinalphase.AuraSkillBuff) {
        phinalphase.Buff.call(this, user, energyReq, key, frame, cooldown, userAnim, stop, duration, effects, afterEffects);
    } else {
        phinalphase.Attack.call(this, user, energyReq, key, frame, cooldown, userAnim, stop, dmg, enemyCollide);
    }
    this.animaton = anim;

    this.aura = phinalphase.game.make.sprite(0, this.user.height / 2, key);
    this.aura.aura = false;
    this.aura.anchor.setTo(0.5, 1);
    this.aura.name = anim[0];
    this.aura.animations.add(anim[0], Phaser.Animation.generateFrameNames(anim[1], anim[2], anim[3], anim[4], anim[5]), anim[6]);
    this.user.addChild(this.aura);
    this.aura.kill();
}




phinalphase.AuraSkillBuff = function (user, energyReq, key, frame, cooldown, userAnim, stop, duration, anim, effects, afterEffects) {
    phinalphase.AuraSkill.apply(this, arguments);
}


phinalphase.AuraSkillBuff.prototype = Object.create(phinalphase.AuraSkill.prototype);
phinalphase.AuraSkillBuff.prototype.constructor = phinalphase.AuraSkillBuff;
phinalphase.AuraSkillBuff.prototype.use = function () {
    if (!this.isOnCD) {
        this.user.busy = true;
        this.isOnCD = true;
        phinalphase.game.time.events.add(this.cooldown * 1000, function () {
            this.isOnCD = false;
        }, this);
        this.effects(this.user);
        this.user.play(this.userAnim);
        if (this.stop) {
            this.user.animations.stop();
        }

        this.aura.revive();
        this.aura.aura = true;

        this.aura.animations.currentAnim.loop = false;
        this.aura.animations.currentAnim.onComplete.add(function () {
            this.aura.kill();
            this.aura.aura = false;
            this.user.busy = false;
            this.aura.animations.currentAnim.onComplete._bindings.pop();
            phinalphase.game.time.events.add(this.duration * 1000, function () {
                this.afterEffects(this.user);
            }, this);

        }, this);
    }
}



phinalphase.AuraSkillDmg = function (user, energyReq, key, frame, cooldown, userAnim, stop, duration, anim, dmg, enemyCollide) {
    phinalphase.AuraSkill.call(this, user, energyReq, key, frame, cooldown, userAnim, stop, duration, anim, undefined, undefined, dmg, enemyCollide);
    phinalphase.game.physics.arcade.enable(this.aura);
}


phinalphase.AuraSkillDmg.prototype = Object.create(phinalphase.AuraSkill.prototype);
phinalphase.AuraSkillDmg.prototype.constructor = phinalphase.AuraSkillDmg;
phinalphase.AuraSkillDmg.prototype.use = function () {
    if (!this.isOnCD) {
        this.user.busy = true;
        this.isOnCD = true;
        phinalphase.game.time.events.add(this.cooldown * 1000, function () {
            this.isOnCD = false;
        }, this);

        this.user.play(this.userAnim);
        if (this.stop) {
            this.user.animations.stop();
        }
        phinalphase.game.time.events.add(1000, function () {
            this.user.busy = false;
        }, this);


        this.aura.revive();
        this.aura.aura = true;

        var collideFunction = function () {
            phinalphase.game.physics.arcade.overlap(phinalphase[this.userEnemy], this.aura, function (enemy, aura) {
                enemy.act('STRIKED', this);
                this.enemyCollide(enemy);
            }, null, this);
        }.bind(this);
        phinalphase.game.updatables.push(collideFunction);

        phinalphase.game.time.events.add(this.duration * 1000, function () {
            phinalphase.game.updatables.splice(phinalphase.game.updatables.indexOf(collideFunction), 1);
            this.aura.kill();
            this.aura.aura = false;
        }, this);

    }
}











phinalphase.Projectile = function (user, energyReq, key, frame, cooldown, userAnim, stop, dmg, enemyCollide, bullet, offsetX, offsetY) {
    phinalphase.Attack.call(this, user, energyReq, key, frame, cooldown, userAnim, stop, dmg, enemyCollide);
    this.bullet = bullet;
    this.weapon = phinalphase.game.add.weapon(bullet.number, key);
    this.weapon.bulletKillType = Phaser.Weapon[bullet.killType];
    // if (bullet.killType == 'KILL_LIFESPAN') {
    //     this.weapon.bulletLifespan = bullet.lifespan || 5;
    // }
    this.weapon.bulletSpeed = bullet.speed;
    this.weapon.fireRate = cooldown * 1000;


    var collideFunction = function () {
        phinalphase.game.physics.arcade.overlap(phinalphase[this.userEnemy], this.weapon.bullets, function (enemy, bullet) {
            enemy.act('STRIKED', this);
            this.enemyCollide(enemy);
        }, null, this);
    }.bind(this);
    phinalphase.game.updatables.push(collideFunction);
    this.weapon.bullets.forEach(function (p) {
        p.anchor.setTo(0.5, 0.5);
        p.scale.setTo(bullet.scaleX, bullet.scaleY);
    }, this);

    if (bullet.repeat) {
        if (bullet.repeat) {
            this.weapon.addBulletAnimation(frame, null, 60, true);
        } else {
            this.weapon.addBulletAnimation(frame);
        }
    }


    this.weapon.trackSprite(this.user, offsetX, offsetY);
}


phinalphase.Projectile.prototype = Object.create(phinalphase.Skill.prototype);
phinalphase.Projectile.prototype.constructor = phinalphase.Projectile;

phinalphase.Projectile.prototype.use = function () {
    if (this.weapon.bullets.countLiving() == this.bullet.number) {
        return;
    }
    this.user.busy = true;
    this.user.play(this.userAnim, false, function () {
        if (!this.stop) {
            this.user.busy = false;
        }
    }.bind(this));
    if (this.stop) {
        this.user.animations.stop();
        phinalphase.game.time.events.add(500, function () {
            this.user.busy = false;
        }, this);
    }


    if (this.user.scale.x > 0) {
        this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
    } else {
        this.weapon.fireAngle = Phaser.ANGLE_LEFT;
    }
    this.weapon.fire();
}