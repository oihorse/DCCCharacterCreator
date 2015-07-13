/**
 * Created by chris on 6/26/15.
 */

var users = require('../../app/controllers/users.server.controller'),
    hero = require('../../app/controllers/hero.server.controller');
module.exports = function (app) {
    app.route('/api/hero')
        .get(hero.list)
        .post(users.requiresLogin, hero.create);
    app.route('/api/hero/:heroId')
        .get(hero.read)
        .put(users.requiresLogin, hero.hasAuthorization, hero.update)
        .delete(users.requiresLogin, hero.hasAuthorization, hero.delete);
    app.param('heroId', hero.heroByID);
};