/**
 * Created by chris on 4/6/15.
 */
var Elf;

Elf = {
    hitPointDie: 6,
    patron: "",
    famaliar: "",
    corruption: "",
    spellCheck: 0,
    attackBonus: ["1", "1", "2", "2", "3", "3", "4", "4", "5", "5"],
    critDie: ["1d6", "1d8", "1d8", "1d10", "1d10", "1d12", "1d12", "1d14", "1d14", "1d16"],
    actionDie: ["1d20", "1d20", "1d20", "1d20", "1d20 + 1d14", "1d20 + 1d16", "1d20 + 1d16", "1d20 + 1d20", "1d20 + 1d20", "1d20 + 1d20 + 1d14"],
    willPowerBonus: [1, 1, 2, 2, 3, 4, 4, 5, 5, 6],
    fortitudeBonus: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4],
    reflexBonus: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4],
    spellsKnown: [3, 4, 5, 6, 7, 8, 9, 10, 12, 14],
    maxLevel: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    maxSpellCastingLevel: [1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 5]
};

Elf.generateCritTable = function () {
    var crit = "II";

    return crit;
};

Elf.getElfTitle = function (level) {
    var title = "";
    level = parseInt(level, 10);

    switch (level) {
        case 1:
            title = "Wanderer";
            break;
        case 2:
            title = "Seer";
            break;
        case 3:
            title = "Quester";
            break;
        case 4:
            title = "Savant";
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
            title = "Elder";
            break;
        default:
            title = "";
    }
    return title;
};

Elf.getSpellCheck = function (charLevel, intelligenceModifier) {
    var sc = "";
    charLevel = parseInt(charLevel, 10);
    intelligenceModifier = parseInt(intelligenceModifier, 10);

    var scModifier = charLevel + intelligenceModifier;


    if (scModifier >= 0) {
        sc = "1d20 + ";
    }
    else {
        sc = "1d20 ";
    }

    return sc + scModifier;

};

Elf.getMaximumSpellCastingLevel = function (intelligence) {
    intelligence = parseInt(intelligence, 10);

    var mscl = Elf.maxSpellCastingLevel[intelligence - 3];

    return mscl;
};

Elf.getNumberOfSpellsKnown = function (charLevel) {
    var sk = 0;

    charLevel = parseInt(charLevel, 10);

    sk = (Elf.spellsKnown[charLevel - 1]);

    if (sk <= 0) {
        return 0;
    }

    return sk;

};

Elf.getCurrentCastingLevel = function (charLevel) {
    charLevel = parseInt(charLevel, 10);

    var ccl = Elf.maxLevel[charLevel - 1];

    return ccl;
};