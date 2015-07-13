/**
 * Created by chris on 6/27/15.
 */
angular.module('hero').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/heroes', {
                templateUrl: 'heroviewer/views/viewall.client.view.html'
            }).
            when('/heroes/create', {
                templateUrl: 'hero/views/create-hero.client.view.html'
            }).when('/hero/:heroId', {
                templateUrl: 'heroviewer/views/view-hero.client.view.html'
            }).
            when('/hero/:heroId/edit', {
                templateUrl: 'hero/views/edit-hero.client.view.html'
            });
    }
]);