/**
 * Created by chris on 7/5/15.
 */
angular.module('heroViewer').directive('warriorSpecific', function () {
    return {
        restrict: 'EA',
        replace: false,
        scope: true,
        templateUrl: '/heroviewer/views/partials/warriorpartial.html'
    }
});