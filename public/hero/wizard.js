/**
 * Created by chris on 4/5/15.
 */

var Wizard;
Wizard = {

    hitPointDie: 4,
    patron: "",
    famaliar: "",
    corruption: "",
    spellCheck: 0,
    attackBonus: ["0", "1", "1", "1", "2", "2", "3", "3", "4", "4"],
    critDie: ["1d6", "1d6", "1d8", "1d8", "1d10", "1d10", "1d12", "1d12", "1d14", "1d14"],
    actionDie: ["1d20", "1d20", "1d20", "1d20", "1d20 + 1d14", "1d20 + 1d16", "1d20 + 1d16", "1d20 + 1d20", "1d20 + 1d20", "1d20 + 1d20 + 1d14"],
    willPowerBonus: [1, 1, 2, 2, 3, 4, 4, 5, 5, 6],
    fortitudeBonus: [0, 0, 1, 1, 1, 2, 2, 2, 3, 3],
    reflexBonus: [1, 1, 1, 2, 2, 2, 3, 3, 4, 4],
    spellsKnown: [4, 5, 6, 7, 8, 9, 10, 12, 14, 16],
    maxLevel: [1, 1, 2, 2, 3, 3, 4, 4, 5, 5],
    maxSpellCastingLevel: [1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6],
    bonusSpellsKnown: [-16, -2, -2, -1, -1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2]
};

Wizard.generateCritTable = function () {
    var crit = "I";

    return crit;
};

Wizard.getWizardTitle = function (alignment, level) {
    var title = "";
    level = parseInt(level, 10);


    if (alignment.indexOf('Lawful') != -1) {
        switch (level) {
            case 1:
                title = "Evoker";
                break;
            case 2:
                title = "Controller";
                break;
            case 3:
                title = "Conjurer";
                break;
            case 4:
                title = "Summoner";
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                title = "Elementalist";
                break;
            default:
                title = "";
        }
        return title;
    }

    if (alignment.indexOf('Neutral') != -1) {
        switch (level) {
            case 1:
                title = "Astrologist";
                break;
            case 2:
                title = "Enchanter";
                break;
            case 3:
                title = "Magician";
                break;
            case 4:
                title = "Thaumaturgust";
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                title = "Sorcerer";
                break;
            default:
                title = "";
        }
        return title;
    }
    if (alignment.indexOf('Chaotic') != -1) {
        switch (level) {
            case 1:
                title = "Cultist";
                break;
            case 2:
                title = "Shaman";
                break;
            case 3:
                title = "Diabolist";
                break;
            case 4:
                title = "Warlock / Witch";
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                title = "Necromancer";
                break;
            default:
                title = "";
        }
        return title;
    }

    return title;
};

Wizard.getSpellCheck = function (charLevel, intelligenceModifier) {
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

Wizard.getMaximumSpellCastingLevel = function (intelligence) {
    intelligence = parseInt(intelligence, 10);

    var mscl = Wizard.maxSpellCastingLevel[intelligence - 3];

    return mscl;
};

Wizard.getNumberOfSpellsKnown = function (charLevel, intelligenceModifier) {
    var sk = 0;

    charLevel = parseInt(charLevel, 10);
    intelligenceModifier = parseInt(intelligenceModifier, 10);

    sk = (Wizard.spellsKnown[charLevel - 1]) + (Wizard.bonusSpellsKnown[intelligenceModifier - 3]);

    if (sk <= 0) {
        return 0;
    }

    return sk;

};

Wizard.getCurrentCastingLevel = function (charLevel) {
    charLevel = parseInt(charLevel, 10);

    var ccl = Wizard.maxLevel[charLevel - 1];

    return ccl;
};