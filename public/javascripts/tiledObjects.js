var phinalphase = phinalphase || {};

phinalphase.оbjectGroupFromTiled = function(type, map, layerName, groupName) {
    var res = [];

    map.objects[layerName].forEach(function(ele) {
        if (ele.properties.type === type) {
            ele.y -= (map.tileHeight - 64);
            res.push(ele);

        }
    });

    phinalphase[groupName] = phinalphase.game.add.group();

    phinalphase[groupName].enableBody = true;
    
    phinalphase.game.updatables.push(function() {
        phinalphase.game.physics.arcade.collide(phinalphase[groupName], phinalphase[groupName]);
    })
    
    var uabs = [];
    res.forEach(function(ele) {
        var sprite = phinalphase[groupName].create(ele.x, ele.y, ele.properties.sprite);
        sprite.width = ele.width;
        sprite.height = ele.height;


        Object.keys(ele.properties).forEach(function(key) {
            if (ele == res[res.length - 1] && key.length > 8) {
                if (key.slice(0, 9) == 'usability') {
                    uabs.push(ele.properties[key]);
                }

            }
            sprite[key] = ele.properties[key];
        });

    });

    function usabilityApply(uab) {
        if (uab == 'damage') {
            phinalphase.game.updatables.push(function() {
                this.physics.arcade.overlap(phinalphase.players, phinalphase[groupName], function(player, groupName) {
                    player.act('STRIKED', groupName);
                }, null, this);
            }.bind(phinalphase.game));

        }


        if (uab == 'movable') {
            phinalphase[groupName].children.forEach(function(ele) {
                phinalphase.game.physics.arcade.enable(ele);
                ele.body.collideWorldBounds = true;
                ele.colided = false;
                ele.body.gravity.y = 1000;
                ele.body.mass = -1000;
                ele.anchor.setTo(0.5, 0.5);
            }, this);
            phinalphase.game.updatables.push(function() {
                phinalphase[groupName].children.forEach(function(ele) {
                    if (!ele.colided) {
                        ele.body.immovable = true;
                    } else {
                        ele.body.immovable = false;
                    }
                    ele.colided = false;
                });
                this.physics.arcade.collide(phinalphase.players, phinalphase[groupName], function(player, object) {
                    if (object.body.touching.right || object.body.touching.left) {
                        object.colided = true;
                    }
                }, null, this);

                this.physics.arcade.collide(phinalphase.game.collLayer, phinalphase[groupName], function(object) {
                    if (object.body.blocked.left || object.body.blocked.right) {
                        object.colided = false;
                    }
                }, null, this);
                this.physics.arcade.overlap(phinalphase.players, phinalphase[groupName], function(player, object) {
                    object.colided = false;
                }, null, this);
            }.bind(phinalphase.game));
            return;

        }
    }

    uabs.forEach(function(uab) {
        usabilityApply(uab);
    });

}