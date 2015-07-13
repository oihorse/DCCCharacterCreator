/**
 * Created by chris on 7/5/15.
 */
angular.module('heroViewer').directive('clericSpecific', function () {
    return {
        restrict: 'EA',
        replace: false,
        scope: true,
        templateUrl: '/heroviewer/views/partials/clericpartial.html'
    }
});