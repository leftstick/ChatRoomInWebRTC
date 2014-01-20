/*
 * The EntranceController
 */
Chat.controller("EntranceController", ['$scope', '$location', 'Data',
    function($scope, $location, Data) {
        $scope.Load = function(partial) {
            Data.user({
                nickname: $scope.nickname,
                role: partial
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
        $scope.hasAttendee = false;
        $scope.clients = Data.clients();
        $scope.messages = Data.queue();
        $scope.nickname = Data.user().nickname;
        var peer = PeerJS.createHostPeer();

        $scope.$watch('clients', function() {
            if ($scope.clients.length > 0) {
                $scope.hasAttendee = true;
            } else {
                $scope.hasAttendee = false;
            }
        }, true);

        $scope.send = function($event) {
            if ($event.keyCode === 13) {
                peer.send($scope.message && $scope.message);
                $scope.message = "";
            }
        };
    }
]);

/*
 * The ClientController
 */
Chat.controller("ClientController", ['$scope', 'Data', 'PeerJS',
    function($scope, Data, PeerJS) {
        $scope.hasAttendee = false;
        $scope.clients = Data.clients();
        $scope.messages = Data.queue();
        $scope.nickname = Data.user().nickname;
        var peer = PeerJS.createClientPeer();

        $scope.$watch('clients', function() {
            if ($scope.clients.length > 0) {
                $scope.hasAttendee = true;
            } else {
                $scope.hasAttendee = false;
            }
        }, true);

        $scope.send = function($event) {
            if ($event.keyCode === 13 && $scope.message) {
                peer.send($scope.message);
                $scope.message = "";
            }
        };
    }
]);