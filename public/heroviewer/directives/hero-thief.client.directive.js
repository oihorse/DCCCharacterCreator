/**
 * Created by chris on 7/11/15.
 */
angular.module('heroViewer').directive('thiefSpecific', function () {
    return {
        restrict: 'EA',
        replace: false,
        scope: true,
        templateUrl: '/heroviewer/views/partials/thiefpartial.html'
    }
});