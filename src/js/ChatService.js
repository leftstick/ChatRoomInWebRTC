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