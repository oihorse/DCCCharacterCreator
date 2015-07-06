/**
 * Created by chris on 2/18/15.
 */

var Warrior;
Warrior = {

    hitPointDie: 12,
    luckyWeapon: "",
    critDie: [
        '1d12',
        '1d14',
        '1d16',
        '1d20',
        '1d24',
        '1d30',
        '1d30',
        '2d20',
        '2d20',
        '2d20'
    ],
    attackBonus: ['d3',
        'd4', 'd5',
        'd6', 'd7', 'd8', 'd10 + 1',
        'd10 + 2', 'd10 + 3', 'd10 + 4'],
    actionDie: [
        '1d20', '1d20', '1d20', '1d20', '1d20 + 1d14',
        '1d20 + 1d16', '1d20 + 1d20', '1d20 + 1d20',
        '1d20 + 1d20', '1d20 + 1d20 + 1d14'
    ],

    threatRange: ["19-20", "19-20", "19-20", "19-20", "18-20", "18-20", "18-20", "18-20", "17-20", "17-20"],

    willPowerBonus: [
        0, 0, 1, 1, 1, 1, 2, 2, 3, 3
    ],

    fortitudeBonus: [
        1, 1, 2, 2, 3, 4, 4, 5, 5, 6
    ],

    reflexBonus: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4]
};

Warrior.getWarriorTitle = function (alignment, level) {
    var title = "";
    level = parseInt(level, 10);

    if (alignment.indexOf('Lawful') != -1) {

        switch (level) {
            case 1:
                title = "Squire";
                break;
            case 2:
                title = "Champion";
                break;
            case 3:
                title = "Knight";
                break;
            case 4:
                title = "Cavalier";
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                title = "Paladin";
                break;
            default:
                title = "";
        }
        return title;
    }

    else if (alignment.indexOf("Neutral") != -1) {
        switch (level) {
            case 1:
                title = "Wilding";
                break;
            case 2:
                title = "Barbarian";
                break;
            case 3:
                title = "Berserker";
                break;
            case 4:
                title = "Headman/Headwoman";
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                title = "Chieftain";
                break;
            default:
                title = "";
        }
        return title;
    } else if (alignment.indexOf("Chaotic") != -1) {
        switch (level) {
            case 1:
                title = "Bandit";
                break;
            case 2:
                title = "Brigand";
                break;
            case 3:
                title = "Maraduer";
                break;
            case 4:
                title = "Ravager";
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                title = "Reaver";
                break;
            default:
                title = "";
        }
        return title;
    }

    return title;
};

Warrior.generateCritTable = function (level) {
    var crit = "";
    level = parseInt(level, 10);

    if (level < 3) {
        crit = "III";
    } else if (level < 5 && level > 2) {
        crit = "IV";
    } else {
        crit = "V";
    }

    return crit;
};





