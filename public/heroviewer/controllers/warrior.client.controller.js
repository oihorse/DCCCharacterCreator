/**
 * Created by chris on 7/7/15.
 */
angular.module('heroViewer').controller('Warrior', ['$scope',
    '$routeParams', '$location', 'Authentication', 'HeroViewer', 'Hero',
    function ($scope) {

        $scope.character.threatRange = Warrior.threatRange[$scope.character.level - 1];


    }
]);