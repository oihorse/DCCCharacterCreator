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
