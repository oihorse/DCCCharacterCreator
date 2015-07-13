/**
 * Created by chris on 4/6/15.
 */

var Halfling;

Halfling = {
    hitPointDie: 6,
    attackBonus: ['1', '2', '2', '3', '4', '5', '5', '6', '7 ', '8'],
    critDie: ['1d8', '1d8', '1d10', '1d10', '1d12', '1d12', '1d14', '1d14', '1d16', '1d16'],
    actionDie: [
        "1d20", "1d20", "1d20", "1d20", "1d20",
        "1d20 + 1d14", "1d20 + 1d16", "1d20 + 1d20",
        "1d20 + 1d20", "1d20 + 1d20"
    ],

    willPowerBonus: [
        1, 1, 2, 2, 3, 4, 4, 5, 5, 6],

    fortitudeBonus: [
        1, 1, 1, 2, 2, 2, 3, 3, 3, 4],

    reflexBonus: [1, 1, 2, 2, 3, 4, 4, 5, 5, 6],

    hideAndSneak: [3, 5, 7, 8, 9, 11, 12, 13, 14, 15]

};

Halfling.getHalflingTitle = function (level) {
    var title = "";
    level = parseInt(level, 10);

    switch (level) {
        case 1:
            title = "Wanderer";
            break;
        case 2:
            title = "Explorer";
            break;
        case 3:
            title = "Collector";
            break;
        case 4:
            title = "Accumulator";
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            title = "Wise one";
            break;
        default:
            title = "";
    }
    return title;
};

Halfling.generateCritTable = function () {
    var crit = "III";

    return crit;
};

Halfling.getStealth = function (charLevel) {
    var hide;
    charLevel = parseInt(charLevel, 10);

    hide = Halfling.hideAndSneak[charLevel - 1];

    return hide;

};