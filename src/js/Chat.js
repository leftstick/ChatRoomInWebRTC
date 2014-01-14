/*
 * Bootloader
 */
var Chat = angular.module('Chat', ['ngRoute']);

Chat.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'partials/Entrance.html',
            controller: 'EntranceController'
        }).when('/host', {
            templateUrl: 'partials/host.html',
            controller: 'HostController'
        }).when('/client', {
            templateUrl: 'partials/client.html',
            controller: 'ClientController'
        }).otherwise({
            redirectTo: '/'
        });
    }
]);