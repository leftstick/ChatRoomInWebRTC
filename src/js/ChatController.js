/*
 * The EntranceController
 */
Chat.controller("EntranceController", ['$scope', '$location', 'Data', 'PeerJS',
    function($scope, $location, Data, PeerJS) {
        $scope.Load = function(partial) {
            Data.user({
                nickname: $scope.nickname,
                role: $scope.nickname
            });
            $location.path("/" + partial);
        };
    }
]);

/*
 * The HostController
 */
Chat.controller("HostController", ['$scope', 'Data',
    function($scope, Data) {

    }
]);

/*
 * The ClientController
 */
Chat.controller("ClientController", ['$scope',
    function($scope) {

    }
]);