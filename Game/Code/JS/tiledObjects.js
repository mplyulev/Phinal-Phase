var phinalphase = phinalphase || {};

phinalphase.оbjectGroupFromTiled = function (type, map, layerName, groupName) {
    var res = [];

    map.objects[layerName].forEach(function (ele) {

        if (ele.properties.type === type) {
            ele.y -= map.tileHeight;
            res.push(ele);
        }
    });

    phinalphase[groupName] = phinalphase.game.add.group();

    phinalphase[groupName].enableBody = true;


    res.forEach(function (ele) {
        var sprite = phinalphase[groupName].create(ele.x, ele.y, ele.properties.sprite);
        sprite.width = 64;
        Object.keys(ele.properties).forEach(function (key) {
            sprite[key] = ele.properties[key];
        });
    });

}