var Client = {};

Client.socket = io.connect();

Client.newPlayer = function (characters) {
    Client.socket.emit('newplayer', characters[phinalphase.selectedChar]);
}

Client.createPlayer = function () {
    Client.socket.emit('createPlayer');
}

Client.updateServerObjects = function (objects) {
    Client.socket.emit('updateServerObjects', objects);
}

Client.syncObjects = function (data) {
    Client.socket.emit('syncObjects', data);
}

Client.sendAct = function (act, cause) {
    Client.socket.emit('act', { act: act, cause: cause });
}

Client.update = function () {
    Client.socket.emit('updatePlayers');
}

Client.sync = function (x, y) {
    Client.socket.emit('sync', { x: x, y: y });
}

Client.syncTimer = function (dur) {
    Client.socket.emit('syncTimer', dur);
}

Client.sendUpdatesPlayer = function (properties) {
    Client.socket.emit('updatePlayer', properties);
}


Client.socket.on('newplayer', function (data) {
    phinalphase.Game.addNewPlayer(data);
});

Client.socket.on('allplayers', function (data) {
    var players = data.players;
    var id = data.id;
    var timer = data.timer;
    for (var i = 0; i < players.length; i++) {
        if (players[i].id == id) {
            if (players[i].isHost) {
                phinalphase.Game.addNewPlayer(players[i], true, true, timer);
            } else {
                phinalphase.Game.addNewPlayer(players[i], true, undefined, timer);
            }
        } else {
            phinalphase.Game.addOldPlayer(players[i]);
        }
    }
});

Client.socket.on('changeHost', function () {
    phinalphase.isHost = true;
    phinalphase.updateObjects(false, undefined, true, true);
});

Client.socket.on('requireUpdate', function (id) {
    phinalphase.Game.updateServerInfo(id);
});

Client.socket.on('updatePlayer', function (id) {
    phinalphase.Game.updatePlayer(id);
});

Client.socket.on('sync', function (data) {
    phinalphase.Game.syncPlayer(data.id, data.x, data.y);
});

Client.socket.on('syncObjects', function (data) {
    phinalphase.Game.syncObjects(data);
});

Client.socket.on('act', function (data) {
    phinalphase.Game.playerAct(data.id, data.act, data.cause);
});

Client.socket.on('createMap', function (data) {
    phinalphase.Game.createMapFromServer(data);
});

Client.socket.on('endGame', function () {
    console.log('end');
});

Client.socket.on('remove', function (id) {
    phinalphase.Game.removePlayer(id);
});



