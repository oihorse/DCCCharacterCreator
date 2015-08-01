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
    maxSpellCastingLevel: [1, 1, 1, 1, 2, 2, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6],
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

Wizard.generateRandomLanguage = function(num){
    var language = "";

    if (num > 0 && num <= 10) {
        language = "Alignment tongue";
        return language;
    } else if (num > 10 && num <= 13){
        language = "Chaos";
        return language;
    } else if (num > 13 && num <= 16){
        language = "Law";
        return language;
    } else if (num > 16 && num <= 19){
        language = "Neutrality";
        return language;
    } else if (num > 19 && num <= 21){
        language = "Dwarf";
        return language;
    } else if (num > 21 && num <= 23){
        language = "Elf";
        return language;
    } else if (num > 23 && num <= 25){
        language = "Halfling";
        return language;
    } else if (num > 25 && num <= 27){
        language = "Gnome";
        return language;
    } else if (num > 27 && num <= 29){
        language = "Bugbear";
        return language;
    }else if (num > 29 && num <= 35){
        language = "Goblin";
        return language;
    } else if (num > 36 && num <= 39){
        language = "Gnoll";
        return language;
    } else if (num > 39 && num <= 41){
        language = "Harpy";
        return language;
    } else if (num > 41 && num <= 45){
        language = "Hobgoblin";
        return language;
    } else if (num > 45 && num <= 49){
        language = "Kobold";
        return language;
    } else if (num > 49 && num <= 53){
        language = "Lizard man";
        return language;
    }  else if (num > 53 && num <= 55){
        language = "Minotaur";
        return language;
    } else if (num > 55 && num <= 57){
        language = "Ogre";
        return language;
    } else if (num > 57 && num <= 62){
        language = "Orc";
        return language;
    }else if (num > 63 && num <= 65){
        language = "Serpent-man";
        return language;
    } else if (num > 65 && num <= 68){
        language = "Troglodyte";
        return language;
    } else if (num > 68 && num <= 72){
        language = "Angelic";
        return language;
    }  else if (num > 72 && num <= 73){
        language = "Centaur";
        return language;
    } else if (num > 73 && num <= 79){
        language = "Demonic";
        return language;
    } else if (num > 79 && num <= 80){
        language = "Doppelganger";
        return language;
    } else if (num > 80 && num <= 84){
        language = "Dragon";
        return language;
    } else if (num > 84 && num <= 86){
        language = "Pixie";
        return language;
    } else if (num > 86 && num <= 88){
        language = "Giant";
        return language;
    } else if (num > 88 && num <= 89){
        language = "Griffon";
        return language;
    }  else if (num > 89 && num <= 90){
        language = "Naga";
        return language;
    } else if (num > 90 && num <= 92){
        language = "Bear";
        return language;
    } else if (num > 92 && num <= 94){
        language = "Eagle";
        return language;
    } else if (num > 94 && num <= 96){
        language = "Horse";
        return language;
    }  else if (num > 96 && num <= 98){
        language = "Wolf";
        return language;
    }  else if (num > 98 && num <= 99){
        language = "Spider";
        return language;
    } else if (num > 99 && num <= 100){
        language = "Undercommon";
        return language;
    }
};