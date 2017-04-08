var phinalphase = phinalphase || {};

phinalphase.оbjectGroupFromTiled = function (type, map, layerName, groupName) {
    var res = [];

    map.objects[layerName].forEach(function (ele) {
        if (ele.properties.type === type) {
            ele.y -= (map.tileHeight - ele.height);
            res.push(ele);
        }
    });

    phinalphase[groupName] = phinalphase.game.add.group();

    phinalphase[groupName].enableBody = true;

    var uabs = [];
    res.forEach(function (ele) {
        var sprite = phinalphase[groupName].create(ele.x, ele.y, ele.properties.sprite);
        sprite.width = ele.width;
        sprite.height = ele.height;
        Object.keys(ele.properties).forEach(function (key) {
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
            phinalphase.game.updatables.push(function () {
                this.physics.arcade.overlap(phinalphase.players, phinalphase[groupName], function (player, groupName) {
                    player.act('STRIKED', groupName);
                }, null, this);
            }.bind(phinalphase.game));

        }

        if (uab == 'movable') {
            phinalphase.game.updatables.push(function () {
                this.physics.arcade.collide(phinalphase.players, phinalphase[groupName], null, null, this);
                this.physics.arcade.collide(phinalphase.game.collLayer, phinalphase[groupName], null, null, this);
            }.bind(phinalphase.game));
            return;

        }
    }

    uabs.forEach(function (uab) {
        usabilityApply(uab);
    });

}