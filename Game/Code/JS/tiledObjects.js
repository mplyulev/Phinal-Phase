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


    res.forEach(function (ele) {
        
        var sprite = phinalphase[groupName].create(ele.x, ele.y, ele.properties.sprite);
        sprite.width = ele.width;
        sprite.height = ele.height;
        Object.keys(ele.properties).forEach(function (key) {
            console.log(key);
            sprite[key] = ele.properties[key];
        });
    });

}