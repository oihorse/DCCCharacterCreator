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
            title = "WiseOne";
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

Halfling.generateRandomLanguage = function(num){
    var language = "";

    if (num > 0 && num <= 25) {
        language = "Alignment tongue";
        return language;
    } else if (num > 25 && num <= 35){
        language = "Dwarf";
        return language;
    } else if (num > 35 && num <= 40){
        language = "Elf";
        return language;
    }  else if (num > 40 && num <= 50){
        language = "Gnome";
        return language;
    } else if (num > 50 && num <= 55){
        language = "Bugbear";
        return language;
    }else if (num > 55 && num <= 70){
        language = "Goblin";
        return language;
    }  else if (num > 70 && num <= 80){
        language = "Hobgoblin";
        return language;
    } else if (num > 80 && num <= 90){
        language = "Kobold";
        return language;
    } else if (num > 90 && num <= 93){
        language = "Pixie";
        return language;
    } else if (num > 93 && num <= 98){
        language = "Ferret";
        return language;
    } else if (num > 98 && num <= 100){
        language = "Undercommon";
        return language;
    }
};