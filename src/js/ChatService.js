/**
 * Service, Data layer.
 */
Chat.factory('Data', ['$rootScope',

    function($rootScope) {
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
        factory.addClient = function(client) {
            clients.push(client);
            $rootScope.$apply();
        };
        factory.removeClient = function(peerId) {
            _.find(clients, function(client, index) {
                if (client.peerId === peerId) {
                    clients.splice(index, 1);
                    $rootScope.$apply();
                    return true;
                }
            });
        };
        factory.addToQueue = function(msg, forceUpdate) {
            chatQueue.push(msg);
            if (forceUpdate) {
                $rootScope.$apply();
            }
        };
        factory.queue = function() {
            return chatQueue;
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
        var connections = [];
        var user = Data.user();

        var onClose = function(peer) {
            return function() {
                _.find(connections, function(con, index) {
                    if (con.peer === peer) {
                        connections.splice(index, 1);
                    }
                });
                Data.removeClient(peer);
            };
        };

        factory.createHostPeer = function() {
            var peer = new Peer('leftstick-unique', {
                key: 'm4lam1d6op28d7vi'
            });
            peer.on('connection', function(conn) {
                conn.on('data', function(data) {
                    // Will print 'hi!'
                    console.log(data);
                    if (data.type === 'REQUEST') {
                        conn.send({
                            type: "RESPOND",
                            nickname: user.nickname
                        });
                        _.each(connections, function(con) {
                            con.send({
                                type: "NEW",
                                nickname: data.nickname,
                                peerId: conn.peer
                            });
                        });
                        connections.push(conn);
                        Data.addClient({
                            nickname: data.nickname,
                            peerId: conn.peer
                        });
                        return;
                    }
                    if (data.type === 'CHAT') {
                        Data.addToQueue(data.nickname + " : " + data.msg, true);
                        return;
                    }
                });

                conn.on('close', onClose(conn.peer));
            });


            return {
                send: function(msg) {
                    _.each(connections, function(element, index, list) {
                        element.send({
                            type: 'CHAT',
                            nickname: user.nickname,
                            msg: msg
                        });
                    });
                    Data.addToQueue(user.nickname + " : " + msg);
                }
            };
        };

        factory.createClientPeer = function() {
            var peer = new Peer({
                key: 'm4lam1d6op28d7vi'
            });

            var conn = peer.connect('leftstick-unique');

            conn.on('open', function() {
                console.log(user.nickname, peer.id);
                conn.send({
                    type: 'REQUEST',
                    nickname: user.nickname
                });

            });

            conn.on('data', function(data) {
                console.log("client received : ", data);
                if (data.type === 'RESPOND') {
                    connections.push(conn);
                    Data.addClient({
                        nickname: data.nickname,
                        peerId: conn.peer
                    });
                    return;
                }
                if (data.type === 'NEW') {
                    var con = peer.connect(data.peerId);
                    con.on('open', function() {
                        con.send({
                            type: 'CONNECT_OTHER',
                            nickname: user.nickname
                        });
                        connections.push(con);
                        Data.addClient({
                            nickname: data.nickname,
                            peerId: con.peer
                        });
                    });
                    con.on('data', function(d) {
                        if (d.type === 'CHAT') {
                            Data.addToQueue(d.nickname + " : " + d.msg, true);
                            return;
                        }
                    });
                    con.on('close', onClose(con.peer));
                    return;
                }
                if (data.type === 'CHAT') {
                    Data.addToQueue(data.nickname + " : " + data.msg, true);
                    return;
                }
            });

            conn.on('close', onClose(conn.peer));

            peer.on('connection', function(con) {
                con.on('data', function(data) {
                    console.log("client received 2 : ", data);
                    if (data.type === 'CONNECT_OTHER') {
                        connections.push(con);
                        Data.addClient({
                            nickname: data.nickname,
                            peerId: con.peer
                        });
                        return;
                    }
                    if (data.type === 'CHAT') {
                        Data.addToQueue(data.nickname + " : " + data.msg, true);
                        return;
                    }
                    // Will print 'hi!'
                    console.log(data);
                });
                con.on('close', onClose(con.peer));
            });


            return {
                send: function(msg) {
                    _.each(connections, function(element, index, list) {
                        element.send({
                            type: 'CHAT',
                            nickname: user.nickname,
                            msg: msg
                        });
                    });
                    Data.addToQueue(user.nickname + " : " + msg);
                }
            };
        };

        return factory;
    }
]);