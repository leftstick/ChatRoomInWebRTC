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
            $scope.status = 'hide';
            $location.path("/" + partial);

        };
    }
]);

/*
 * The HostController
 */
Chat.controller("HostController", ['$scope', 'Data',
    function($scope, Data) {
        $scope.nickname = Data.user().nickname;
    }
]);

/*
 * The ClientController
 */
Chat.controller("ClientController", ['$scope',
    function($scope) {

    }
]);