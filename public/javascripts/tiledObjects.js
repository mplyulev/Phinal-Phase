var phinalphase = phinalphase || {};

phinalphase.оbjectGroupFromTiled = function (type, map, layerName, groupName) {
    var res = [];

    map.objects[layerName].forEach(function (ele) {
        if (ele.properties.type === type) {
            if (ele.height < 64) {
                ele.y -= (map.tileHeight - 64);
            } else {
                ele.y -= map.tileHeight;
            }
            if (ele.width < 64) {
                ele.x -= (map.tileWidth - 64);
            } else {
                ele.x -= map.tileWidth;
            }

            res.push(ele);

        }
    });

    phinalphase[groupName] = phinalphase.game.add.group();

    phinalphase[groupName].enableBody = true;



    phinalphase.game.updatables.push(function () {
        phinalphase.game.physics.arcade.collide(phinalphase[groupName], phinalphase[groupName]);
    })

    var uabs = [];
    res.forEach(function (ele) {
        if (ele.properties.sprite == 'none') {
            var sprite = phinalphase[groupName].create(ele.x, ele.y);
        } else {
            var sprite = phinalphase[groupName].create(ele.x, ele.y, ele.properties.sprite);
        }
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
        phinalphase.Game.objectMap.push(sprite);
    });

    function usabilityApply(uab) {
        if (uab == 'damage') {
            phinalphase.game.updatables.push(function () {
                this.physics.arcade.overlap(phinalphase.players, phinalphase[groupName], function (player, groupName) {
                    player.act('STRIKED', groupName);
                }, null, this);
            }.bind(phinalphase.game));
        }


        if (uab == 'damageMoving') {
            phinalphase[groupName].children.forEach(function (object) {
                object.anchor.setTo(0.5, 0.5);
            }, this);
            phinalphase.game.updatables.push(function () {
                this.physics.arcade.overlap(phinalphase.players, phinalphase[groupName], function (player, groupName) {
                    player.act('STRIKED', groupName);
                }, null, this);
                phinalphase[groupName].children.forEach(function (object) {
                    if (object.maxPos > object.currentPos && object.goingDown) {
                        object.angle += 15;
                        object[object.way] += object.speed;
                        object.currentPos += object.speed;
                    } else {
                        object.angle += 15;
                        object.goingDown = false;
                        object[object.way] -= object.speed;
                        object.currentPos -= object.speed;
                        if (object.currentPos <= 0) {
                            object.goingDown = true;
                        }
                    }
                }, this);
            }.bind(phinalphase.game));
        }



        if (uab == 'damageMovingHorizontal') {
            phinalphase.game.updatables.push(function () {
                this.physics.arcade.overlap(phinalphase.players, phinalphase[groupName], function (player, groupName) {
                    player.act('STRIKED', groupName);
                }, null, this);
            }.bind(phinalphase.game));
            phinalphase[groupName].children.forEach(function (element) {
                element.anchor.setTo(0.5, 0.5);
                element.body.velocity.x = -400;
                phinalphase.game.time.events.loop(0.01, function () {
                    element.angle += 15;
                });
                phinalphase.game.time.events.loop(1500, function () {
                    element.body.velocity.x = element.body.velocity.x * (-1);
                    element.angle = element.angle * (-1);
                });
            }, this);
        }

        if (uab == "healing") {
            phinalphase.game.updatables.push(function () {
                this.physics.arcade.overlap(phinalphase.players, phinalphase[groupName], function (player, element) {
                    if (player.health <= 80) {
                        player.health += 20;
                    }
                    if (player.health >= 80 && player.health < 100) {
                        player.health = 100;
                    }
                    player.healSound.play();
                    element.body = null;
                    element.kill();
                }, null, this);
            }.bind(phinalphase.game));
        }
        if (uab == "poison") {
            phinalphase.game.updatables.push(function () {
                this.physics.arcade.overlap(phinalphase.players, phinalphase[groupName], function (player, element) {
                    this.camera.shake(0.05, 2000);
                    this.camera.flash(0xff0000, 2000);
                    //???????


                    element.body = null;
                    element.kill();
                }, null, this);
            }.bind(phinalphase.game));
        }

        if (uab == 'movingPlatform') {
            phinalphase.game.updatables.push(function () {
                this.physics.arcade.collide(phinalphase.players, phinalphase[groupName], function (player, groupName) { }, null, this);
            }.bind(phinalphase.game));
            phinalphase[groupName].children.forEach(function (element) {
                element.body.velocity.x = element.speed;
                element.body.immovable = true;
                phinalphase.game.time.events.loop(element.changeDirTime, function () {
                    element.body.velocity.x = element.body.velocity.x * (-1);
                }, this)
                element.events.onOutOfBounds.add(elementKill, this);
                element.checkWorldBounds = true;
                function elementKill(element) {
                    element.kill();
                }
            });
        }


        if (uab == 'static') {
            phinalphase.game.updatables.push(function () {
                this.physics.arcade.collide(phinalphase.players, phinalphase[groupName], function (player, groupName) { }, null, this);
            }.bind(phinalphase.game));
            phinalphase[groupName].children.forEach(function (element) {
                element.body.immovable = true;
            }, this);
        }



        if (uab == 'movable') {
            phinalphase[groupName].children.forEach(function (ele) {
                phinalphase.game.physics.arcade.enable(ele);
                ele.body.collideWorldBounds = true;
                ele.colided = false;
                ele.body.gravity.y = 1000;
                ele.body.drag.x = 3000;
                ele.anchor.setTo(0.5, 0.5);
            }, this);
            phinalphase.game.updatables.push(function () {
                phinalphase[groupName].children.forEach(function (ele) {
                    if (!ele.colided) {
                        ele.body.immovable = true;
                    } else {
                        ele.body.immovable = false;
                    }
                    ele.colided = false;
                });
                this.physics.arcade.collide(phinalphase.players, phinalphase[groupName], function (player, object) {
                    if (object.body.touching.right || object.body.touching.left) {
                        object.colided = true;
                    }
                }, null, this);

                this.physics.arcade.collide(phinalphase.game.collLayer, phinalphase[groupName], function (object) {
                    if (object.body.blocked.left || object.body.blocked.right) {
                        object.colided = false;
                    }
                }, null, this);
                this.physics.arcade.overlap(phinalphase.players, phinalphase[groupName], function (player, object) {
                    object.colided = false;
                    player.overlapGlitchHandle(object);
                }, null, this);
            }.bind(phinalphase.game));
            return;

        }
    }

    uabs.forEach(function (uab) {
        usabilityApply(uab);
    });

}