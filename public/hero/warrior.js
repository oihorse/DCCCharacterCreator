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

    reflexBonus: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4],

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

Warrior.generateRandomLanguage = function(num){
    var language = "";

    if (num > 0 && num <= 20) {
        language = "Alignment tongue";
        return language;
    } else if (num > 20 && num <= 30){
        language = "Dwarf";
        return language;
    } else if (num > 30 && num <=35){
        language = "Elf";
        return language;
    } else if (num > 35 && num <=38){
        language = "Halfling";
        return language;
    } else if (num > 38 && num <=43){
        language = "Bugbear";
        return language;
    } else if (num > 43 && num <=53){
        language = "Goblin";
        return language;
    } else if (num > 53 && num <=58){
        language = "Gnoll";
        return language;
    } else if (num > 58 && num <=63){
        language = "Harpy";
        return language;
    } else if (num > 63 && num <=70){
        language = "Hobgoblin";
        return language;
    } else if (num > 70 && num <=78){
        language = "Kobold";
        return language;
    } else if (num > 78 && num <=81){
        language = "Lizard man";
        return language;
    } else if (num > 81 && num <=83){
        language = "Minotaur";
        return language;
    } else if (num > 83 && num <=88){
        language = "Ogre";
        return language;
    } else if (num > 88 && num <=95){
        language = "Orc";
        return language;
    } else if (num > 95 && num <=96){
        language = "Serpent-man";
        return language;
    } else if (num > 96 && num <=98){
        language = "Troglodyte";
        return language;
    } else if (num > 98 && num <=100){
        language = "Giant";
        return language;
    }
};





