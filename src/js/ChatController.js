/*
 * The EntranceController
 */
Chat.controller("EntranceController", ['$scope', '$location', 'Data',
    function($scope, $location, Data) {
        $scope.Load = function(partial) {
            Data.user({
                nickname: $scope.nickname,
                role: $scope.nickname
            });
            $scope.status = 'hide';
            $location.path("/" + partial);
        };
    }
]);

/*
 * The HostController
 */
Chat.controller("HostController", ['$scope', 'Data', 'PeerJS',
    function($scope, Data, PeerJS) {
        $scope.clients = Data.clients();
        PeerJS.createPeer();
    }
]);

/*
 * The ClientController
 */
Chat.controller("ClientController", ['$scope', 'Data', 'PeerJS',
    function($scope, Data, PeerJS) {
        $scope.clients = Data.clients();
        PeerJS.createPeer();
    }
]);