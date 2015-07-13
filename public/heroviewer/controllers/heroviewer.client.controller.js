/**
 * Created by chris on 6/28/15.
 */
angular.module('heroViewer').controller('HeroViewerController', ['$scope',
    '$routeParams', '$location', 'Authentication', 'HeroViewer', 'Hero',
    function ($scope, $routeParams, $location, Authentication, HeroViewer, Hero) {
        $scope.authentication = Authentication;

        $scope.findOne = function () {
            $scope.hero = Hero.get({
                heroId: $routeParams.heroId
            });
        };

    }
]);