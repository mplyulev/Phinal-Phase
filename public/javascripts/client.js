var Client = {};

Client.socket = io.connect();

Client.askNewPlayer = function () {
    Client.socket.emit('newplayer', phinalphase.playerNinja);
}

Client.sendAct = function (act) {
    Client.socket.emit('act', { act: act });
}

Client.reqUpdate = function () {
    
    Client.socket.emit('reqUpdate');
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
            phinalphase.Game.addNewPlayer(players[i], true);
        } else {
            phinalphase.Game.addOldPlayer(players[i]);
        }
    }
});

Client.socket.on('update', function (data) {
    phinalphase.Game.updatePlayer(data);
});

Client.socket.on('act', function (data) {
    phinalphase.Game.playerAct(data.id, data.act);
});

Client.socket.on('remove', function (id) {
    phinalphase.Game.removePlayer(id);
});



