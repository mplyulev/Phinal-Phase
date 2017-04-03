var phinalphase = phinalphase || {};

phinalphase.creatures = [];

// constructor for creatures

phinalphase.Creature = function (name, sheet, json, gravity) {
    this.name = name;
    this.sheet = sheet;
    this.json = json;
    this.gravity = gravity;
}

phinalphase.Creature.prototype.preloadCreature = function () {
    this.load.atlas(this.name, this.sheet, this.json);
}

phinalphase.Creature.prototype.createCreature = function () {
    
}


