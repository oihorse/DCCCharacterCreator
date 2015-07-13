/**
 * Created by chris on 6/21/15.
 */

angular.module('heroPicker').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/heropicker/create', {
                templateUrl: 'heroPicker/views/pick-hero.client.view.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

]);
