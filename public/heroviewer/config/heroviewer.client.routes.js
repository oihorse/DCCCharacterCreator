/**
 * Created by chris on 6/28/15.
 */
angular.module('heroViewer').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/heroviewer/viewall', {
                templateUrl: 'heroviewer/views/viewall.client.view.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    }

]);