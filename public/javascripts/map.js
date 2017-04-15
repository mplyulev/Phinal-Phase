var phinalphase = phinalphase || {};

phinalphase.createMap = function(map, tiles, layers, objects) {
    this.map = this.game.add.tilemap(map);

    tiles.forEach(function(ele) {
        this.map.addTilesetImage(ele[0], ele[1]);
    }, this);

    layers.forEach(function(ele) {
        objects.forEach(function(ele) {
            if (ele[0] === "background") {
                phinalphase.оbjectGroupFromTiled(ele[0], this.map, ele[1], ele[2]);
            }
           
            console.log(ele);
        }, this);
        this[ele[0]] = this.map.createLayer(ele[1]);
        if (this[ele[0]].layer.properties.layerType == 'block') {
            phinalphase.game.collLayer = this[ele[0]];
            this.map.setCollisionBetween(1, 200000, true, ele[1]);
            this.game.updatables.push(function() {
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

    objects.forEach(function(ele) {
        if (ele[0] !== "background") {
            phinalphase.оbjectGroupFromTiled(ele[0], this.map, ele[1], ele[2]);
        }
    }, this);
}

phinalphase.createClouds = function() {
    var cloudGroup = this.game.add.group();
    var x = 100;
    var cloudArray = ["cloud3", "cloud2", "cloud4", "cloud5"];
    for (var index = 0; index < 20; index++) {
        var cloud = this.game.add.sprite(x, Math.random() * 150, cloudArray[Math.floor(Math.random() * 5)]);
        cloud.scale.setTo(0.1, 0.1);
        x += 500;
        cloudGroup.add(cloud);
    }
    cloudGroup.children.forEach(function(cloud) {
        phinalphase.game.physics.arcade.enable(cloud);
        cloud.body.velocity.x = -20;
    });
}