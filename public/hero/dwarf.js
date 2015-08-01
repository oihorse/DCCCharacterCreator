/**
 * Created by chris on 4/5/15.
 */

var Dwarf;

Dwarf = {
    hitPointDie: 10,
    luckyWeapon: "",
    attackBonus: ["d3", "d4", "d5", "d6", "d7", "d8", "d10 + 1", "d10 + 2", "d10 + 3", "d10 + 4"],
    critDie: ["1d10", "1d12", "1d14", "1d16", "1d20", "1d24", "1d30", "1d30", "2d20", "2d20"],
    actionDie: ["1d20", "1d20", "1d20", "1d20", "1d20 + 1d14", "1d20 + 1d16", "1d20 + 1d20",
        "1d20 + 1d20", "1d20 + 1d20", "1d20 + 1d20 + 1d14"],

    willPowerBonus: [0, 0, 1, 1, 1, 1, 2, 2, 3, 3],
    fortitudeBonus: [1, 1, 2, 2, 3, 4, 4, 5, 5, 6],
    reflexBonus: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4]

};

Dwarf.getDwarfTitle = function (alignment, level) {
    var title = "";
    level = parseInt(level, 10);

    if (alignment.indexOf('Lawful') != -1) {

        switch (level) {
            case 1:
                title = "Agent";
                break;
            case 2:
                title = "Broker";
                break;
            case 3:
                title = "Delegate";
                break;
            case 4:
                title = "Envoy";
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                title = "Syndic";
                break;
            default:
                title = "";
        }
        return title;
    }

    else if (alignment.indexOf("Neutral") != -1) {
        switch (level) {
            case 1:
                title = "Apprentice";
                break;
            case 2:
                title = "Novice";
                break;
            case 3:
                title = "Journeyer";
                break;
            case 4:
                title = "Crafter";
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                title = "Thegn";
                break;
            default:
                title = "";
        }
        return title;
    } else if (alignment.indexOf("Chaotic") != -1) {
        switch (level) {
            case 1:
                title = "Rebel";
                break;
            case 2:
                title = "Dissident";
                break;
            case 3:
                title = "Exile";
                break;
            case 4:
                title = "Iconoclast";
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                title = "Renegade";
                break;
            default:
                title = "";
        }
        return title;
    }

    return title;
};

Dwarf.generateCritTable = function (level) {
    var crit = "";
    level = parseInt(level, 10);

    if (level <= 3) {
        crit = "III";
    } else if (level <= 5 && level > 3) {
        crit = "IV";
    } else {
        crit = "V";
    }

    return crit;
};

Dwarf.generateRandomLanguage = function (num) {
    var language = "";

    if (num > 0 && num <= 20) {
        language = "Alignment tongue";
        return language;
    } else if (num > 20 && num <= 25) {
        language = "Elf";
        return language;
    } else if (num > 25 && num <= 35) {
        language = "Halfling";
        return language;
    } else if (num > 35 && num <= 40) {
        language = "Gnome";
        return language;
    } else if (num > 40 && num <= 45) {
        language = "Bugbear";
        return language;
    } else if (num > 45 && num <= 55) {
        language = "Goblin";
        return language;
    } else if (num > 55 && num <= 60) {
        language = "Gnoll";
        return language;
    }  else if (num > 60 && num <= 65) {
        language = "Hobgoblin";
        return language;
    } else if (num > 65 && num <= 75) {
        language = "Kobold";
        return language;
    } else if (num > 75 && num <= 76) {
        language = "Minotaur";
        return language;
    } else if (num > 76 && num <= 81) {
        language = "Ogre";
        return language;
    } else if (num > 81 && num <= 86) {
        language = "Orc";
        return language;
    } else if (num > 86 && num <= 91) {
        language = "Troglodyte";
        return language;
    } else if (num > 91 && num <= 93) {
        language = "Dragon";
        return language;
    } else if (num > 93 && num <= 97) {
        language = "Giant";
        return language;
    } else if (num > 97 && num <= 98) {
        language = "Bear";
        return language;
    }else if (num > 98 && num <= 100) {
        language = "Undercommon";
        return language;
    }
};