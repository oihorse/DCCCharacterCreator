/**
 * Created by chris on 7/5/15.
 */
angular.module('hero').directive('warriorSpecific', function () {
    return {
        scope: {},
        templateUrl: '/templates/loginRegForms.html', link: function (scope, ele, attrs) {
            scope.showLoginForm = true;
            scope.submitLogin = function () {
                scope.onLogin({user: scope.loginUser});
            }
            scope.submitRegister = function () {
                scope.onRegister({user: scope.newUser});
            }
        }
    }
});