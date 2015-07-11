/**
 * Created by chris on 7/11/15.
 */
angular.module('heroViewer').directive('dwarfSpecific', function () {
    return {
        restrict: 'EA',
        replace: false,
        scope: true,
        templateUrl: '/heroviewer/views/partials/dwarfpartial.html'
    }
});