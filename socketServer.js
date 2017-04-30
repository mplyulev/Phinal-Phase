function getSocket(server, user) {
    var io = require('socket.io', { rememberTransport: false, transports: ['WebSocket', 'Flash Socket', 'AJAX long-polling'] }).listen(server);

    serverInfo = {
        user: user
    }
    server.lastPlayerID = 0;
    server.connectedUsers = 0;
    server.matchTime = server.matchTime || 300000;
    server.haveTimer = false;


    serverObjects = [];


    io.on('connection', function (socket) {
        // Object.keys(io.sockets.connected).forEach(function (socketID) {
        //     if (io.sockets.connected[socketID].player) {
        //         if (io.sockets.connected[socketID].player.username == serverInfo.user[0].username) {
        //             io.to(socket.id).emit('samePerson');

        //             samePerson = true;
        //         }
        //     }
        // });

        if (!server.haveTimer) {
            server.haveTimer = true;
            timer = setInterval(function () {
                server.matchTime -= 1000;
                if (server.matchTime <= 270000) {
                    io.emit('stopGame');
                    clearInterval(timer);
                    server.haveTimer = false;
                    server.matchTime = 300000;
                }
            }, 1000);
        }


        socket.on('newplayer', function (data) {


            server.connectedUsers++;
            socket.player = data;
            socket.player.isHost = false;
            socket.player.id = server.lastPlayerID++;
            socket.player.username = serverInfo.user[0].username;
            socket.player.health = 100;
            socket.player.energy = 100;
            socket.player.isInAir = false;
            socket.player.busy = false;
            socket.player.canAttackAgain = true;
            socket.player.alive = true;
            socket.player.isFlinched = false;
            socket.player.canBeHitted = true;
            socket.player.changingOffset = false;
            socket.player.oldCropX = 0;
            socket.player.oldCropY = 0;
            socket.player.kills = 0;
            socket.player.deaths = 0;
            socket.player.score = 0;

            if (server.connectedUsers > 1) {
                socket.broadcast.emit('requireUpdate', socket.player.id);
            } else {
                io.to(socket.id).emit('createMap', serverObjects);
            }


            socket.on('score', function (data) {
                Object.keys(data).forEach(function (key) {
                    socket.player[key] = data[key];
                });
                var player = serverInfo.user[0];
                var killsSum = data.kills + player.kills;
                var deathsSum = data.deaths + player.deaths;
                var scoreSum = data.score + player.score;
                users.update({ username: socket.player.username }, { $set: { kills: killsSum, deaths: deathsSum, score: scoreSum } }).then(function () {
                    io.to(socket.id).emit('endGame');
                });

            });

            socket.on('createPlayer', function (data) {
                socket.emit('allplayers', { players: getAllPlayers(), id: socket.player.id, timer: server.matchTime });
                socket.broadcast.emit('newplayer', socket.player);
            });

            socket.on('updatePlayer', function (data) {
                Object.keys(data).forEach(function (key) {
                    socket.player[key] = data[key];
                });
            });

            socket.on('updateServerObjects', function (data) {
                serverObjects = data.objects;
                if (!data.newplayer) {
                    Object.keys(io.sockets.connected).forEach(function (socketID) {
                        if (io.sockets.connected[socketID].player.id == data.id) {
                            io.to(socketID).emit('createMap', serverObjects);
                        }
                    });

                }
            });

            socket.on('updatePlayers', function () {
                socket.broadcast.emit('updatePlayer', socket.player.id);
            });

            socket.on('syncObjects', function (data) {
                socket.broadcast.emit('syncObjects', data);
            });

            socket.on('sync', function (data) {
                socket.broadcast.emit('sync', { id: socket.player.id, x: data.x, y: data.y });
            });

            socket.on('syncTimer', function (data) {
                server.matchTime = data;
            });


            socket.on('act', function (data) {
                socket.broadcast.emit('act', { id: socket.player.id, act: data.act, cause: data.cause });
            });

            socket.on('disconnect', function () {
                server.connectedUsers--;
                if (socket.player.isHost && server.connectedUsers != 0) {
                    var foundNewHost = false;
                    Object.keys(io.sockets.connected).forEach(function (socketID) {
                        if (socketID != socket.id && !foundNewHost) {
                            io.sockets.connected[socketID].player.isHost = true;
                            io.to(socketID).emit('changeHost');
                            foundNewHost = true;
                        }
                    });
                }

                io.emit('remove', socket.player.id);
            });
        });
    });

    function getAllPlayers() {
        var players = [];
        Object.keys(io.sockets.connected).forEach(function (socketID) {
            var player = io.sockets.connected[socketID].player;
            if (server.connectedUsers == 1) {
                player.isHost = true;
            }
            if (player) players.push(player);
        });
        return players;
    }
};

module.exports.getSocket = getSocket;