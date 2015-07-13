/**
 * Created by chris on 2/28/15.
 */
var Cleric;
Cleric = {

    hitPointDie: 8,
    diety: "",
    spellCheck: 0,
    attackBonus: ["0", "1", "2", "2", "3", "4", "5", "5", "6", "7"],
    critDie: ["1d8", "1d8", "1d10", "1d10", "1d12", "1d12", "1d14", "1d14", "1d16", "1d16"],
    actionDie: ["1d20", "1d20", "1d20", "1d20", "1d20", "1d20 + 1d14", "1d20 + 1d16", "1d20 + 1d20", "1d20 + 1d20", "1d20 + 1d20"],
    willPowerBonus: [1, 1, 2, 2, 3, 4, 4, 5, 5, 6],
    fortitudeBonus: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4],
    reflexBonus: [0, 0, 1, 1, 1, 2, 2, 2, 3, 3],
    spellsKnown: [[4], [5], [5, 3], [6, 4], [6, 5, 2], [7, 5, 3], [7, 6, 4, 1], [8, 6, 5, 2], [8, 7, 5, 3, 1], [9, 7, 6, 4, 2]],
    maxSpellCastingLevel: [1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 5]

};

Cleric.generateCritTable = function () {
    var crit = "III";

    return crit;
};

Cleric.getClericTitle = function (alignment, level) {
    var title = "";
    level = parseInt(level, 10);


    if (alignment.indexOf('Lawful') != -1) {
        switch (level) {
            case 1:
                title = "Acolyte";
                break;
            case 2:
                title = "Heathen-slayer";
                break;
            case 3:
                title = "Brother";
                break;
            case 4:
                title = "Curate";
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                title = "Father";
                break;
            default:
                title = "";
        }
        return title;
    }

    else if (alignment.indexOf("Neutral") != -1) {
        switch (level) {
            case 1:
                title = "Witness";
                break;
            case 2:
                title = "Pupil";
                break;
            case 3:
                title = "Chronicler";
                break;
            case 4:
                title = "Judge";
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                title = "Druid";
                break;
            default:
                title = "";
        }
        return title;
    } else if (alignment.indexOf("Chaotic") != -1) {
        switch (level) {
            case 1:
                title = "Zealot";
                break;
            case 2:
                title = "Convert";
                break;
            case 3:
                title = "Cultist";
                break;
            case 4:
                title = "Apostle";
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                title = "High priest";
                break;
            default:
                title = "";
        }
        return title;
    }

    return title;
};

Cleric.getSpellCheck = function (charLevel, personalityModifier) {
    var sc = "";
    charLevel = parseInt(charLevel, 10);
    personalityModifier = parseInt(personalityModifier, 10);

    var scModifier = charLevel + personalityModifier;


    if (scModifier >= 0) {
        sc = "1d20 + ";
    }
    else {
        sc = "1d20 ";
    }

    return sc + scModifier;

};

Cleric.getMaximumSpellCastingLevel = function (personality) {
    var spellText = "";
    personality = parseInt(personality, 10);

    var mscl = Cleric.maxSpellCastingLevel[personality - 3];

    return mscl;
};

Cleric.getSpellsKnown = function (charLevel) {
    //charLevel = parseInt(charLevel);
    var sk = [];
    sk = Cleric.spellsKnown[charLevel - 1];
    var levels = sk.length;

    switch (levels) {
        case 1:
            spellText = "1st Level - " + sk[0];
            break;
        case 2:
            spellText = "1st level - " + sk[0] + "\n" +
                "2nd level - " + sk[1];
            break;
        case 3:
            spellText = "1st level - " + sk[0] + "\n" +
                "2nd level - " + sk[1] + "\n" +
                "3rd level - " + sk[2];
            break;
        case 4:
            spellText = "1st level - " + sk[0] + "\n" +
                "2nd level - " + sk[1] + "\n" +
                "3rd level - " + sk[2] + "\n" +
                "4th level - " + sk[3];
            break;
        case 5:
            spellText = "1st level - " + sk[0] + "\n" +
                "2nd level - " + sk[1] + "\n" +
                "3rd level - " + sk[2] + "\n" +
                "4th level - " + sk[3] + "\n" +
                "5th level - " + sk[4];
            break;
    }

    return spellText;
};