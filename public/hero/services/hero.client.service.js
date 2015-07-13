/**
 * Created by chris on 6/26/15.
 */
angular.module('hero').factory('Hero', ['$resource',
    function ($resource) {
        return $resource('api/hero/:heroId', {
            heroId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }]);