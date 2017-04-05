var phinalphase = phinalphase || {};

phinalphase.createMap = function (map, tiles, layers, objects) {
    this.map = this.game.add.tilemap(map);

    tiles.forEach(function (ele) {
        this.map.addTilesetImage(ele[0], ele[1]);
    }, this);
    
    layers.forEach(function (ele) {
        
        this[ele[0]] = this.map.createLayer(ele[1]);
        if (this[ele[0]].layer.properties.layerType == 'block') {
            phinalphase.game.collLayer = this[ele[0]];
            this.map.setCollisionBetween(1, 200000, true, ele[1]);
            this.game.updatables.push(function () {
                this.game.physics.arcade.collide(phinalphase.players, this[ele[0]], null, null, this)
                this.game.physics.arcade.collide(phinalphase.enemies, this[ele[0]], null, null, this);
            }.bind(this));
        }
        if (this[ele[0]].layer.properties.layerType == 'background') {
            this[ele[0]].resizeWorld();
        } else if (layers[layers.length - 1] == ele) {
            this[ele[0]].resizeWorld();
        }
    }, this);

    objects.forEach(function (ele) {
        phinalphase.оbjectGroupFromTiled(ele[0], this.map, ele[1], ele[2]);
    }, this);
}