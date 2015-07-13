/**
 * Created by chris on 6/23/15.
 */

angular.module('motd').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'motd/views/motd.client.view.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);