/**
 * Created by chris on 6/26/15.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var HeroSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    characterName: {
        type: String,
        default: '',
        trim: true,
        required: 'Name cannot be blank'
    }, level: {
        type: String,
        default: '',
        required: 'Must choose a level',
        trim: true
    }, charClass: {
        type: String,
        default: '',
        required: "Must choose a class",
        trim: true
    }, charAbilities: {
        type: Schema.Types.Mixed,
    }, occupation: {
        type: Schema.Types.Mixed,
    }, alignment: {
        type: String,
    }, title: {
        type: String,
    }, speed: {
        type: String,
    }, initiative: {
        type: String,
    }, critTable: {
        type: String,
    }, critDie: {
        type: String,
    }, attackBonus: {
        type: String,
    }, actionDie: {
        type: String,
    }, meleeBonus: {
        type: String,
    }, missileBonus: {
        type: String,
    }, creator: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Hero', HeroSchema);