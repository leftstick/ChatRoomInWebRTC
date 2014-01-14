/*
 * The EntranceController
 */
Chat.controller("EntranceController", ['$scope', '$location', 'Data', function($scope, $location, Data) {
    $scope.Load = function(partial){
        Data.user($scope.nickname);
        $location.path("/" + partial);
    };
}]);

/*
 * The HostController
 */
Chat.controller("HostController", ['$scope', 'Data', function($scope, Data) {
    
}]);

/*
 * The ClientController
 */
Chat.controller("ClientController", ['$scope', function($scope) {

}]);