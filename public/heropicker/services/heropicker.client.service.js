/**
 * Created by chris on 6/21/15.
 */
angular.module('heroPicker').factory('HeroPicker', ['$resource',
    function ($resource) {
        return $resource('api/heroPicker/:heroPickerId', {
            heroPickerId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);