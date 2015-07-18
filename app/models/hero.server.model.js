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
    },  occupation: {
        type: Schema.Types.Mixed,
    }, strength: {
        type: Schema.Types.Mixed,
    }, agility: {
        type: Schema.Types.Mixed,
    }, stamina: {
        type: Schema.Types.Mixed,
    }, strength: {
        type: Schema.Types.Mixed,
    }, personality: {
        type: Schema.Types.Mixed,
    }, luck: {
        type: Schema.Types.Mixed,
    }, intelligence: {
        type: Schema.Types.Mixed,
    }, luckyRoll: {
        type: Schema.Types.Mixed,
    }, willPowerSave: {
        type: Schema.Types.Mixed,
    }, reflexSave: {
        type: Schema.Types.Mixed,
    }, fortitudeSave: {
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
    },  hitPoints: {
        type: String,
    }, classSpecific: {
        type: Schema.Types.Mixed,
    },  ownedWeapons: {
        type: Array,
    },  equipment: {
        type: String,
    },   ownedArmor: {
        type: Array,
    },   treasure: {
        type: String,
    }, creator: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Hero', HeroSchema);