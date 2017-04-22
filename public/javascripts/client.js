var Client = {};

Client.socket = io.connect();

Client.askNewPlayer = function (characters) {
    Client.socket.emit('newplayer', characters[phinalphase.selectedChar]);
}

Client.syncObjects = function (data) {
    Client.socket.emit('syncObjects', data);
}

Client.sendAct = function (act, cause) {
    Client.socket.emit('act', { act: act, cause: cause });
}

Client.reqUpdate = function () {
    Client.socket.emit('reqUpdate');
}

Client.sync = function (x, y) {
    Client.socket.emit('sync', { x: x, y: y });
}

Client.sendUpdates = function (properties) {
    Client.socket.emit('update', properties);
}


Client.socket.on('newplayer', function (data) {
    phinalphase.Game.addNewPlayer(data);
});

Client.socket.on('allplayers', function (data) {
    var players = data.players;
    var id = data.id;
    for (var i = 0; i < players.length; i++) {
        if (players[i].id == id) {
            if (players[i].isHost) {
                phinalphase.Game.addNewPlayer(players[i], true, true);
            } else {
                phinalphase.Game.addNewPlayer(players[i], true);
            }
        } else {
            phinalphase.Game.addOldPlayer(players[i]);
        }
    }
});

Client.socket.on('changeHost', function () {
    phinalphase.isHost = true;
});

Client.socket.on('update', function (id) {
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

Client.socket.on('remove', function (id) {
    phinalphase.Game.removePlayer(id);
});



