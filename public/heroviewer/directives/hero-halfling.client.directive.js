/**
 * Created by chris on 7/11/15.
 */
angular.module('heroViewer').directive('halflingSpecific', function () {
    return {
        restrict: 'EA',
        replace: false,
        scope: true,
        templateUrl: '/heroviewer/views/partials/halflingpartial.html'
    }
});