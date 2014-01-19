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

        factory.createHostPeer = function() {
            var connections = [];
            var user = Data.user();
            var peer = new Peer('leftstick-unique', {
                key: 'm4lam1d6op28d7vi'
            });
            peer.on('connection', function(conn) {
                conn.on('data', function(data) {
                    // Will print 'hi!'
                    console.log(data);
                    if (data.type === 'NEW') {
                        conn.send({
                            type: "NICKNAME",
                            nickname: user.nickname
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
            var connections = [];
            var user = Data.user();
            var peer = new Peer({
                key: 'm4lam1d6op28d7vi'
            });

            var conn = peer.connect('leftstick-unique');

            conn.on('open', function() {
                console.log(user.nickname, peer.id);
                conn.send({
                    type: 'NEW',
                    nickname: user.nickname
                });

                conn.on('data', function(data) {
                    console.log("client received : ", data);
                    if (data.type === 'NICKNAME') {
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
            });

            peer.on('connection', function(con) {
                con.on('data', function(data) {
                    if (data.type === 'NEW') {
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