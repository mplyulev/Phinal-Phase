function getSocket(server) {
    var io = require('socket.io').listen(server);

    server.lastPlayderID = 0;

    io.on('connection', function (socket) {
        socket.on('newplayer', function (data) {
            socket.player = data;
            socket.player.id = server.lastPlayderID++;
            socket.player.act = undefined;
            socket.player.health = 100;
            socket.player.energy = 100;
            socket.player.isInAir = false;
            socket.player.busy = false;
            socket.player.canAttackAgain = true;
            socket.player.alive = true;
            socket.player.isFlinched = false;
            socket.player.canBeHitted = true;
            socket.player.oldCropY = 0;
            socket.player.oldCropX = 0;


            socket.emit('allplayers', { players: getAllPlayers(), id: socket.player.id });
            socket.broadcast.emit('newplayer', socket.player);


            socket.on('update', function (data) {
                Object.keys(data).forEach(function (key) {
                    socket.player[key] = data[key];
                });
            });

            socket.on('reqUpdate', function () {
                io.emit('update', socket.player);
            });

            socket.on('act', function (data) {
                socket.player.act = data.act;
                io.emit('act', socket.player);
            });

            socket.on('disconnect', function () {
                io.emit('remove', socket.player.id);
            });
        });
    });

    function getAllPlayers() {
        var players = [];
        Object.keys(io.sockets.connected).forEach(function (socketID) {
            var player = io.sockets.connected[socketID].player;
            if (player) players.push(player);
        });
        return players;
    }
};

module.exports.getSocket = getSocket;