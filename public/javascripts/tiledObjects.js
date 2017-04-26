var phinalphase = phinalphase || {};

phinalphase.оbjectGroupFromTiled = function (type, map, layerName, groupName) {
    var res = [];

    map.objects[layerName].forEach(function (ele) {
        if (ele.properties.type === type) {
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

        sprite.x = ele.x;
        sprite.y = ele.y;
        sprite.rotation = ele.rotation;
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
            phinalphase[groupName].children.forEach(function (object) {
                object.angle = object.rotation;
                object.body.angle = object.rotation;
            }, this);

            phinalphase.game.updatables.push(function () {
                this.physics.arcade.overlap(phinalphase.players, phinalphase[groupName], function (player, groupName) {
                    player.act('STRIKED', groupName);
                }, null, this);
            }.bind(phinalphase.game));
        }


        if (uab == 'damageMoving') {
            phinalphase[groupName].children.forEach(function (object) {
                object.anchor.setTo(0.5, 0.5);
                object.direction1 = true;
            }, this);
            phinalphase.game.updatables.push(function () {
                this.physics.arcade.overlap(phinalphase.players, phinalphase[groupName], function (player, obj) {
                    player.act('STRIKED', obj);
                }, null, this);
                phinalphase[groupName].children.forEach(function (object) {
                    if (object.maxPos > object.currentPos && object.direction1) {
                        if (object.spin) {
                            object.angle += object.spin;
                        }
                        var speed = phinalphase.putDeltaSpeed(object.speed);
                        object[object.way] += speed;
                        object.currentPos += speed;
                    } else {
                        if (object.spin) {
                            object.angle += object.spin;
                        }
                        object.direction1 = false;
                        var speed = phinalphase.putDeltaSpeed(object.speed);
                        object[object.way] -= speed;
                        object.currentPos -= speed;
                        if (object.currentPos <= 0) {
                            object.direction1 = true;
                        }
                    }
                }, this);
            }.bind(phinalphase.game));
        }

        if (uab == "consumable") {
            phinalphase[groupName].forEach(function (obj) {
                obj.currentPos = 0;
                obj.direction1 = false;
                obj.maxPos = 10;
            }, this);
            phinalphase.game.updatables.push(function () {
                phinalphase[groupName].forEach(function (obj) {
                    if (obj.direction1) {
                        obj.y += 0.2;
                        obj.currentPos += 0.2;
                        if (obj.currentPos >= obj.maxPos) {
                            obj.direction1 = false;
                        }
                    } else {
                        obj.y -= 0.2;
                        obj.currentPos -= 0.2;
                        if (obj.currentPos <= 0) {
                            obj.direction1 = true;
                        }
                    }
                }, this);
            });
            var overlapFunc = function () {
                this.physics.arcade.overlap(phinalphase.players, phinalphase[groupName], function (player, element) {
                    if (element.use == 'heal') {
                        if (player.health == 100) {
                            return;
                        }
                        player.health += element.heal;
                        if (player.health > 100) {
                            player.health = 100;
                        }
                        // player.healSound.play();
                    }
                    if (element.use == 'poison') {
                        if (player == phinalphase.Game.playerMap[phinalphase.playerID]) {
                            this.camera.shake(0.05, 2000);
                            this.camera.flash(0xff0000, 2000);
                        }

                        player.getHitted(element);
                    }
                    if (element.use == 'energy') {
                        if (player.energy == 100) {
                            return;
                        }
                        player.energy += element.energy;
                        if (player.energy > 100) {
                            player.energy = 100;
                        }
                    }


                    element.body.enable = false;
                    element.kill();
                    this.time.events.add(element.respawnTime * 1000, function () {
                        this.revive();
                        phinalphase.game.time.events.add(500, function () {
                            this.body.enable = true;
                        }.bind(this))
                    }.bind(element));
                }, null, this);
            }.bind(phinalphase.game);
            phinalphase.game.updatables.push(overlapFunc);
        }

        if (uab == 'movingPlatform') {
            phinalphase[groupName].children.forEach(function (object) {
                object.direction1 = true;
                object.body.immovable = true;
            }, this);
            phinalphase.game.updatables.push(function () {
                this.physics.arcade.collide(phinalphase.players, phinalphase[groupName], function (player, platform) {
                    if (platform.direction1) {
                        player[platform.way] += phinalphase.putDeltaSpeed(platform.speed);
                    } else {
                        player[platform.way] -= phinalphase.putDeltaSpeed(platform.speed);
                    }
                }, null, this);
                phinalphase[groupName].children.forEach(function (object) {
                    if (object.maxPos > object.currentPos && object.direction1) {
                        var speed = phinalphase.putDeltaSpeed(object.speed);
                        object[object.way] += speed;
                        object.currentPos += speed;
                    } else {
                        object.direction1 = false;
                        var speed = phinalphase.putDeltaSpeed(object.speed);
                        object[object.way] -= speed;
                        object.currentPos -= speed;
                        if (object.currentPos <= 0) {
                            object.direction1 = true;
                        }
                    }
                }, this);
            }.bind(phinalphase.game));
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
                ele.body.gravity.y = 500;
                ele.body.drag.x = phinalphase.putDeltaSpeed(3000);
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
                    if (ele.body.velocity.y > 300) {
                        ele.falling = true;
                    } else {
                        ele.falling = false;
                    }

                });
                this.physics.arcade.collide(phinalphase.players, phinalphase[groupName], function (player, object) {
                    if (object.body.touching.right || object.body.touching.left) {
                        object.colided = true;
                    }

                    if (object.falling && player.body.touching.up) {
                        player.getHitted({ damage: 100 });
                    }
                }, null, this);

                this.physics.arcade.collide(phinalphase.game.collLayer, phinalphase[groupName], function (object) {
                    if (object.body.blocked.left || object.body.blocked.right) {
                        object.colided = false;
                    }
                    if (object.falling) {
                        this.camera.shake(0.01, 500);
                    }
                }, null, this);
                this.physics.arcade.overlap(phinalphase.players, phinalphase[groupName], function (player, object) {
                    object.colided = false;
                }, null, this);
            }.bind(phinalphase.game));
            return;

        }
    }

    uabs.forEach(function (uab) {
        usabilityApply(uab);
    });

}