/**
 * Created by chris on 6/26/15.
 */

var mongoose = require('mongoose'),
    Hero = mongoose.model('Hero');

var getErrorMessage = function (err) {
    if (err.errors) {
        for (var errName in err.errors) {
            if (err.errors[errName].message) return err.errors[errName].
                message;
        }
    } else {
        return 'Unknown server error';
    }
};

exports.create = function (req, res) {
    var hero = new Hero(req.body);
    hero.creator = req.user;
    hero.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(hero);
        }
    });
};

exports.list = function (req, res) {
    Hero.find({creator: req.user._id}).sort('-created').populate('creator', 'firstName lastName fullName')
        .exec(function (err, hero) {
            if (err) {
                return res.status(400).send({
                    message: getErrorMessage(err)
                });
            } else {
                res.json(hero);
            }
        });
};

exports.heroByID = function (req, res, next, id) {
    Hero.findById(id).populate('creator', 'firstName lastName fullName')
        .exec(function (err, hero) {
            if (err) return next(err);
            if (!hero) return next(new Error('Failed to load hero '
                + id));
            req.hero = hero;
            next();
        });
};

exports.read = function (req, res) {
    res.json(req.hero);
};


exports.update = function (req, res) {
    var hero = req.hero;
    hero.level = req.body.level;
    hero.title = req.body.title;
    hero.critTbale = req.body.critTable;
    hero.critDie = req.body.critDie;
    hero.attackBonus = req.body.attackBonus;
    hero.actionDie = req.body.actionDie;
    hero.alignment = req.body.alignment;
    hero.classSpecific = req.body.classSpecific;
    hero.hitPoints = req.body.hitPoints;
    hero.reflexSave = req.body.reflexSave;
    hero.willPowerSave = req.body.willPowerSave;
    hero.fortitudeSave = req.body.fortitudeSave;
    hero.strength = req.body.strength;
    hero.agility = req.body.agility;
    hero.stamina = req.body.stamina;
    hero.personality = req.body.personality;
    hero.luck = req.body.luck;
    hero.intelligence = req.body.intelligence;
    hero.meleeBonus = req.body.meleeBonus;
    hero.missileBonus = req.body.missileBonus;
    hero.equipment = req.body.equipment;
    hero.weapons = req.body.equipment;
    hero.armor = req.body.armor;
    hero.treasure = req.body.treasure;

    hero.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(hero);
        }
    });
};

exports.delete = function (req, res) {
    var hero = req.hero;
    hero.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: getErrorMessage(err)
            });
        } else {
            res.json(hero);
        }
    });
};


exports.hasAuthorization = function (req, res, next) {
    if (req.hero.creator.id !== req.user.id) {
        return res.status(403).send({
            message: 'User is not authorized'
        });
    }
    next();
};