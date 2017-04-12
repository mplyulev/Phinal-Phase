var phinalphase = phinalphase || {};

phinalphase.Skill = function (user, energyReq) {
    this.user = user;
    this.energyReq = energyReq;

};



phinalphase.BuffSkill = function (user, energyReq, key, frame, duration, cooldown, anim, effects, afterEffects) {
    phinalphase.Skill.call(this, user, energyReq);
    this.effects = effects;
    this.afterEffects = afterEffects;
    this.duration = duration;
    this.cooldown = cooldown;
    this.isOnCD = false;
    this.animaton = anim;
    this.aura = phinalphase.game.make.sprite(-60, -110, key);
    this.aura.aura = true;
    this.aura.name = anim[0];
    this.aura.animations.add(anim[0], Phaser.Animation.generateFrameNames(anim[1], anim[2], anim[3], anim[4], anim[5]), anim[6]);
    this.user.addChild(this.aura);
    this.aura.kill();
}


phinalphase.BuffSkill.prototype = Object.create(phinalphase.Skill.prototype);
phinalphase.BuffSkill.prototype.constructor = phinalphase.BuffSkill;
phinalphase.BuffSkill.prototype.use = function () {
    if (!this.isOnCD) {
        this.user.isAttacking = true;
        phinalphase.game.time.events.add(100, function () {
            this.isOnCD = true;
        }, this);
        phinalphase.game.time.events.add(this.cooldown * 1000, function () {
            this.isOnCD = false;
        }, this);
        for (var key in this.effects) {
            if (this.effects.hasOwnProperty(key)) {
                var effect = this.effects[key];
                this.user[key] = effect;
            }
        }
        this.user.play(this.user.animationsObject.block[0]);
        this.user.animations.stop();
        this.aura.revive();

        this.aura.animations.currentAnim.loop = false;
        this.aura.animations.currentAnim.onComplete.add(function () {
            this.aura.kill();
            this.user.isAttacking = false;
            phinalphase.game.time.events.add(this.duration * 1000, function () {
                for (var key in this.afterEffects) {
                    if (this.afterEffects.hasOwnProperty(key)) {
                        var afterEffect = this.afterEffects[key];
                        this.user[key] = afterEffect;
                    }
                }
            }, this);

        }, this);
    }
}

phinalphase.DmgSkill = function (user, energyReq, key, frame) {
    phinalphase.Skill.call(this, user, energyReq);
    //Dmg
    //weapon
    //animation
    //collide

}


phinalphase.DmgSkill.prototype = Object.create(phinalphase.Skill.prototype);
phinalphase.DmgSkill.prototype.constructor = phinalphase.DmgSkill;