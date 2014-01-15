/**
 * Service, Data layer.
 */
Chat.factory('Data', [
    function() {
        var factory = {};
        var user;
        factory.user = function(){
            var args = Array.prototype.slice.call(arguments);
            if(args.length === 0){
                return user;
            }
            user = args[0];
            return user;
        };
        return factory;
   }]
);

/**
 * Service, PeerJS wapper.
 */
Chat.factory('PeerJS', [
    function() {
        var factory = {};
        var peer;
        var connection = [];
        factory.createPeer = function(){
            peer = new Peer('leftstick-unique', {key: 'm4lam1d6op28d7vi'});
            peer.on('connection', function(conn) {
                
            });
            return peer;
        };
        return factory;
   }]
);