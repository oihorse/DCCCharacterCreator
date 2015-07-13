/**
 * Created by chris on 6/21/15.
 */
angular.module('heroPicker').controller('HeroPickerController', ['$scope',
    '$routeParams', '$location', 'Authentication', 'HeroPicker',
    function ($scope, $routeParams, $location, Authentication, HeroPicker, Hero) {
        $scope.authentication = Authentication;

        $scope.create = function () {
            console.log("charName is: " + characterName + ' level: ' + level + ' class: ' + charClass);
            var hero = new Hero({
                characterName: this.characterName,
                level: this.level,
                charClass: this.charClass
            });
            hero.$save(function (response) {
                $location.path('hero/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };
    }
]);