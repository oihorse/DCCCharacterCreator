/**
 * Created by chris on 7/11/15.
 */
angular.module('heroViewer').directive('elfSpecific', function () {
    return {
        restrict: 'EA',
        replace: false,
        scope: true,
        templateUrl: '/heroviewer/views/partials/elfpartial.html'
    }
});