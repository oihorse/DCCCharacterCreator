/**
 * Created by chris on 7/5/15.
 */
angular.module('heroViewer').directive('warriorSpecific', function () {


    return {
        restrict: 'E',
        replace: false,
        scope: true,
        templateUrl: '/heroviewer/views/partials/warriorpartial.html',
        controller: ('Warrior', function ($scope, $element, $attrs, $transclude) {
            $scope.character.threatRange = Warrior.threatRange[$scope.character.level - 1];
        })

    }
});