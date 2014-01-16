/**
 * Service, Data layer.
 */
Chat.factory('Data', [

    function() {
        var factory = {};
        var user;
        var clients = [];
        factory.user = function() {
            var args = Array.prototype.slice.call(arguments);
            if (args.length === 0) {
                return user;
            }
            user = args[0];
            return user;
        };
        factory.clients = function() {
            return clients;
        };
        return factory;
    }
]);

/**
 * Service, PeerJS wapper.
 */
Chat.factory('PeerJS', ['Data',
    function(Data) {
        var factory = {};
        var peer;
        var connections = [];
        factory.createPeer = function(onMessage, onNewComer) {
            var user = Data.user();
            if (user.role === 'host') {
                peer = new Peer('leftstick-unique', {
                    key: 'm4lam1d6op28d7vi'
                });
                peer.on('connection', function(conn) {
                    for (var i = 0; i < connections.length; i++) {
                        (function(index, co) {
                            connections[index].send(JSON.stringify({
                                type: "NEW"
                            }));
                            Data.clients().push(co.peer);
                            if (onNewComer) {
                                onNewComer({
                                    nickname: co.peer
                                });
                            }
                        })(i, conn);
                    }
                    conn.on('data', function(data) {
                        var msg = JSON.parse(data);
                        if (msg.type === 'NICKNAME') {
                            for (var client in Data.clients()) {
                                if (client.nickname === msg.former) {
                                    client.nickname = msg.nickname;
                                    return;
                                }
                            }
                        }
                        if (onMessage) {
                            onMessage(data);
                        }
                    });
                    conn.on('close', (function(peer) {
                        return function() {
                            for (var i = 0; i < connections.length; i++) {
                                if (peer === connections[i].peer) {
                                    connections.splice(i, 1);
                                }
                            }
                        };
                    })(conn.peer));
                    connections.push(conn);
                });
            } else if (user.role === 'client') {
                peer = new Peer({
                    key: 'm4lam1d6op28d7vi'
                });
                var conn = peer.connect('leftstick-unique');
                connections.push(conn);
                peer.on('connection', function(conn) {
                    conn.on('data', function(data) {
                        if (msgReceivedCallback) {
                            msgReceivedCallback(data);
                        }
                    });
                    conn.on('close', (function(peer) {
                        return function() {
                            for (var i = 0; i < connections.length; i++) {
                                if (peer === connections[i].peer) {
                                    connections.splice(i, 1);
                                }
                            }
                        };
                    })(conn.peer));
                    connections.push(conn);
                });
            }


            return {
                close: function() {
                    peer.close();
                }
            };
        };
        return factory;
    }
]);