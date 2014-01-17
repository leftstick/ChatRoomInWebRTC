/**
 * Service, Data layer.
 */
Chat.factory('Data', [

    function() {
        var factory = {};
        var user;
        var clients = [];
        var chatQueue = [];
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
        factory.addToQueue = function(msg) {
            chatQueue.push(msg);
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
        factory.createPeer = function() {
            var user = Data.user();
            if (user.role === 'host') {
                peer = new Peer('leftstick-unique', {
                    key: 'm4lam1d6op28d7vi'
                });
                peer.on('connection', function(conn) {
                    conn.on('data', function(data) {
                        var msg = JSON.parse(data);
                        if (msg.type === "NEW") {
                            conn.send(JSON.stringify({
                                type: "NICKNAME_ANSWER",
                                nickname: user.nickname
                            }));
                            for (var i = 0; i < connections.length; i++) {
                                connections[i].send(JSON.stringify({
                                    type: "NEW",
                                    nickname: msg.nickname,
                                    peer: msg.peer
                                }));
                            }
                            Data.clients().push({
                                peer: conn.peer,
                                nickname: msg.nickname
                            });
                            connections.push(conn);
                            return;
                        }
                        if (msg.type === 'CHAT') {
                            Data.addToQueue(msg.msg);
                        }
                    });
                    conn.on('close', (function(peer) {
                        return function() {
                            for (var i = 0; i < connections.length; i++) {
                                if (peer === connections[i].peer) {
                                    connections.splice(i, 1);
                                    Data.clients().splice(i, 1);
                                }
                            }
                        };
                    })(conn.peer));
                });
            } else if (user.role === 'client') {
                peer = new Peer({
                    key: 'm4lam1d6op28d7vi'
                });
                var conn = peer.connect('leftstick-unique');
                connections.push(conn);
                conn.send(JSON.stringify({
                    type: "NEW",
                    nickname: user.nickname,
                    peer: conn.peer
                }));
                peer.on('connection', function(conn) {
                    conn.on('data', function(data) {
                        var msg = JSON.parse(data);
                        if (msg.type === "NICKNAME_ANSWER") {
                            Data.clients().push({
                                peer: conn.peer,
                                nickname: msg.nickname
                            });
                            connections.push(conn);
                            return;
                        }
                        if (msg.type === "NEW") {
                            var con = peer.connect(msg.peer);
                            connections.push(con);
                            con.send(JSON.stringify({
                                type: "NEW",
                                nickname: user.nickname, 
                                peer: con.peer
                            }));
                            return;
                        }
                    });
                    conn.on('close', (function(peer) {
                        return function() {
                            for (var i = 0; i < connections.length; i++) {
                                if (peer === connections[i].peer) {
                                    connections.splice(i, 1);
                                    Data.clients().splice(i, 1);
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