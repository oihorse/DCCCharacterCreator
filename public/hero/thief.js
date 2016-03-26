/**
 * Created by chris on 2/28/15.
 */
var Thief;
Thief = {
    hitPointDie: 6,
    backstab: "",
    sneakSilently: "",
    hideInShadows: "",
    pickPocket: "",
    climbSheerSurfaces: "",
    pickLock: "",
    findTrap: "",
    disableTrap: "",
    forgeDocument: "",
    disguiseSelf: "",
    readLanguages: "",
    handlePoison: "",
    castSpellFromScroll: "",

    attackBonus: ['0',
        '1', '2',
        '2', '3', '4', '5',
        '5', '6 ', '7'],
    critDie: [
        '1d10',
        '1d12',
        '1d14',
        '1d16',
        '1d20',
        '1d24',
        '1d30',
        '1d30+2',
        '1d30+4',
        '1d30+6'
    ],
    actionDie: [
        "1d20", "1d20", "1d20", "1d20", "1d20",
        "1d20 + 1d14", "1d20 + 1d16", "1d20 + 1d20",
        "1d20 + 1d20", "1d20 + 1d20"
    ],
    luckyDie: [
        "3", "4", "5", "6",
        "7", "8", "10", "12",
        "14", "16"],

    willPowerBonus: [
        0, 0, 1, 1, 1, 2, 2, 2, 3, 3],

    fortitudeBonus: [
        1, 1, 1, 2, 2, 2, 3, 3, 3, 4],

    reflexBonus: [1, 1, 2, 2, 3, 3, 4, 5, 5, 6]

};

Thief.getThiefTitle = function (alignment, level) {
    var title = "";
    level = parseInt(level, 10);

    if (alignment.indexOf('Lawful') != -1) {
        switch (level) {
            case 1:
                title = "Bravo";
                break;
            case 2:
                title = "Apprentice";
                break;
            case 3:
                title = "Rogue";
                break;
            case 4:
                title = "Capo";
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                title = "Boss";
                break;
            default:
                title = "";
        }
        return title;
    }

    else if (alignment.indexOf("Neutral") != -1) {
        switch (level) {
            case 1:
                title = "Beggar";
                break;
            case 2:
                title = "Cutpurse";
                break;
            case 3:
                title = "Burglar";
                break;
            case 4:
                title = "Robber";
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                title = "Swindler";
                break;
            default:
                title = "";
        }
        return title;
    } else if (alignment.indexOf("Chaotic") != -1) {
        switch (level) {
            case 1:
                title = "Thug";
                break;
            case 2:
                title = "Murderer";
                break;
            case 3:
                title = "Cutthroat";
                break;
            case 4:
                title = "Executioner";
                break;
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                title = "Assassin";
                break;
            default:
                title = "";
        }
        return title;
    }

    return title;
};

Thief.generateCritTable = function () {
    var crit = "II";

    return crit;
};

Thief.generateThiefSkills = function (alignment, level, agilityModifier, intelligenceModifier, personalityModifier) {
    alignment = alignment;
    level = parseInt(level, 10);
    agilityModifier = parseInt(agilityModifier, 10);
    intelligenceModifier = parseInt(intelligenceModifier, 10);
    personalityModifier = parseInt(personalityModifier, 10);
    var operator = "";
    if (intelligenceModifier > 0) {
        operator = "+ " + intelligenceModifier;
    } else if (intelligenceModifier < 0)
    {
        operator = intelligenceModifier;
    } else {
        operator = '';
    }



    if (alignment.indexOf('Lawful') != -1) {
        switch (level) {
            case 1:
                Thief.backstab = 1;
                Thief.sneakSilently = 1 + agilityModifier;
                Thief.hideInShadows = 3 + agilityModifier;
                Thief.pickPocket = 1 + agilityModifier;
                Thief.climbSheerSurfaces = 3 + agilityModifier;
                Thief.pickLock = 1 + agilityModifier;
                Thief.findTrap = 3 + intelligenceModifier;
                Thief.disableTrap = 3 + agilityModifier;
                Thief.forgeDocument = 0 + personalityModifier;
                Thief.disguiseSelf = 0 + personalityModifier;
                Thief.readLanguages = 0 + intelligenceModifier;
                Thief.handlePoison = 0;
                Thief.castSpellFromScroll = "d10 " + operator;
                break;
            case 2:
                Thief.backstab = 3;
                Thief.sneakSilently = 3 + agilityModifier;
                Thief.hideInShadows = 5 + agilityModifier;
                Thief.pickPocket = 3 + agilityModifier;
                Thief.climbSheerSurfaces = 5 + agilityModifier;
                Thief.pickLock = 3 + agilityModifier;
                Thief.findTrap = 5 + intelligenceModifier;
                Thief.disableTrap = 5 + agilityModifier;
                Thief.forgeDocument = 0 + personalityModifier;
                Thief.disguiseSelf = 1 + personalityModifier;
                Thief.readLanguages = 0 + intelligenceModifier;
                Thief.handlePoison = 1;
                Thief.castSpellFromScroll = "d10 " + operator;
                break;
            case 3:
                Thief.backstab = 5;
                Thief.sneakSilently = 5 + agilityModifier;
                Thief.hideInShadows = 7 + agilityModifier;
                Thief.pickPocket = 5 + agilityModifier;
                Thief.climbSheerSurfaces = 7 + agilityModifier;
                Thief.pickLock = 5 + agilityModifier;
                Thief.findTrap = 7 + intelligenceModifier;
                Thief.disableTrap = 7 + agilityModifier;
                Thief.forgeDocument = 1 + personalityModifier;
                Thief.disguiseSelf = 2 + personalityModifier;
                Thief.readLanguages = 1 + intelligenceModifier;
                Thief.handlePoison = 2;
                Thief.castSpellFromScroll = "d12 " + operator;
                break;
            case 4:
                Thief.backstab = 7;
                Thief.sneakSilently = 7 + agilityModifier;
                Thief.hideInShadows = 8 + agilityModifier;
                Thief.pickPocket = 7 + agilityModifier;
                Thief.climbSheerSurfaces = 8 + agilityModifier;
                Thief.pickLock = 7 + agilityModifier;
                Thief.findTrap = 8 + intelligenceModifier;
                Thief.disableTrap = 8 + agilityModifier;
                Thief.forgeDocument = 2 + personalityModifier;
                Thief.disguiseSelf = 3 + personalityModifier;
                Thief.readLanguages = 2 + intelligenceModifier;
                Thief.handlePoison = 3;
                Thief.castSpellFromScroll = "d12 " + operator;
                break;
            case 5:
                Thief.backstab = 8;
                Thief.sneakSilently = 8 + agilityModifier;
                Thief.hideInShadows = 9 + agilityModifier;
                Thief.pickPocket = 8 + agilityModifier;
                Thief.climbSheerSurfaces = 9 + agilityModifier;
                Thief.pickLock = 8 + agilityModifier;
                Thief.findTrap = 9 + intelligenceModifier;
                Thief.disableTrap = 9 + agilityModifier;
                Thief.forgeDocument = 3 + personalityModifier;
                Thief.disguiseSelf = 4 + personalityModifier;
                Thief.readLanguages = 3 + intelligenceModifier;
                Thief.handlePoison = 4;
                Thief.castSpellFromScroll = "d14 " + operator;
                break;
            case 6:
                Thief.backstab = 9;
                Thief.sneakSilently = 9 + agilityModifier;
                Thief.hideInShadows = 11 + agilityModifier;
                Thief.pickPocket = 9 + agilityModifier;
                Thief.climbSheerSurfaces = 11 + agilityModifier;
                Thief.pickLock = 9 + agilityModifier;
                Thief.findTrap = 11 + intelligenceModifier;
                Thief.disableTrap = 11 + agilityModifier;
                Thief.forgeDocument = 4 + personalityModifier;
                Thief.disguiseSelf = 5 + personalityModifier;
                Thief.readLanguages = 4 + intelligenceModifier;
                Thief.handlePoison = 5;
                Thief.castSpellFromScroll = "d14 " + operator;
                break;
            case 7:
                Thief.backstab = 10;
                Thief.sneakSilently = 10 + agilityModifier;
                Thief.hideInShadows = 12 + agilityModifier;
                Thief.pickPocket = 10 + agilityModifier;
                Thief.climbSheerSurfaces = 12 + agilityModifier;
                Thief.pickLock = 10 + agilityModifier;
                Thief.findTrap = 12 + intelligenceModifier;
                Thief.disableTrap = 12 + agilityModifier;
                Thief.forgeDocument = 5 + personalityModifier;
                Thief.disguiseSelf = 6 + personalityModifier;
                Thief.readLanguages = 5 + intelligenceModifier;
                Thief.handlePoison = 6;
                Thief.castSpellFromScroll = "d16 " + operator;
                break;
            case 8:
                Thief.backstab = 11;
                Thief.sneakSilently = 11 + agilityModifier;
                Thief.hideInShadows = 13 + agilityModifier;
                Thief.pickPocket = 11 + agilityModifier;
                Thief.climbSheerSurfaces = 13 + agilityModifier;
                Thief.pickLock = 11 + agilityModifier;
                Thief.findTrap = 13 + intelligenceModifier;
                Thief.disableTrap = 13 + agilityModifier;
                Thief.forgeDocument = 6 + personalityModifier;
                Thief.disguiseSelf = 7 + personalityModifier;
                Thief.readLanguages = 6 + intelligenceModifier;
                Thief.handlePoison = 7;
                Thief.castSpellFromScroll = "d16 " + operator;
                break;
            case 9:
                Thief.backstab = 12;
                Thief.sneakSilently = 12 + agilityModifier;
                Thief.hideInShadows = 14 + agilityModifier;
                Thief.pickPocket = 12 + agilityModifier;
                Thief.climbSheerSurfaces = 14 + agilityModifier;
                Thief.pickLock = 12 + agilityModifier;
                Thief.findTrap = 14 + intelligenceModifier;
                Thief.disableTrap = 14 + agilityModifier;
                Thief.forgeDocument = 7 + personalityModifier;
                Thief.disguiseSelf = 8 + personalityModifier;
                Thief.readLanguages = 7 + intelligenceModifier;
                Thief.handlePoison = 8;
                Thief.castSpellFromScroll = "d20 " + operator;
                break;
            case 10:
                Thief.backstab = 13;
                Thief.sneakSilently = 13 + agilityModifier;
                Thief.hideInShadows = 15 + agilityModifier;
                Thief.pickPocket = 13 + agilityModifier;
                Thief.climbSheerSurfaces = 15 + agilityModifier;
                Thief.pickLock = 13 + agilityModifier;
                Thief.findTrap = 15 + intelligenceModifier;
                Thief.disableTrap = 15 + agilityModifier;
                Thief.forgeDocument = 8 + personalityModifier;
                Thief.disguiseSelf = 9 + personalityModifier;
                Thief.readLanguages = 8 + intelligenceModifier;
                Thief.handlePoison = 9;
                Thief.castSpellFromScroll = "d20 " + operator;
                break;

        }

    } else if (alignment.indexOf("Neutral") != -1) {
        switch (level) {
            case 1:
                Thief.backstab = 0;
                Thief.sneakSilently = 3 + agilityModifier;
                Thief.hideInShadows = 1 + agilityModifier;
                Thief.pickPocket = 3 + agilityModifier;
                Thief.climbSheerSurfaces = 3 + agilityModifier;
                Thief.pickLock = 1 + agilityModifier;
                Thief.findTrap = 1 + intelligenceModifier;
                Thief.disableTrap = 1 + agilityModifier;
                Thief.forgeDocument = 3 + personalityModifier;
                Thief.disguiseSelf = 0 + personalityModifier;
                Thief.readLanguages = 0 + intelligenceModifier;
                Thief.handlePoison = 0;
                Thief.castSpellFromScroll = "d12 " + operator;
                break;
            case 2:
                Thief.backstab = 1;
                Thief.sneakSilently = 5 + agilityModifier;
                Thief.hideInShadows = 3 + agilityModifier;
                Thief.pickPocket = 5 + agilityModifier;
                Thief.climbSheerSurfaces = 5 + agilityModifier;
                Thief.pickLock = 3 + agilityModifier;
                Thief.findTrap = 3 + intelligenceModifier;
                Thief.disableTrap = 3 + agilityModifier;
                Thief.forgeDocument = 5 + personalityModifier;
                Thief.disguiseSelf = 0 + personalityModifier;
                Thief.readLanguages = 1 + intelligenceModifier;
                Thief.handlePoison = 0;
                Thief.castSpellFromScroll = "d12 " + operator;
                break;
            case 3:
                Thief.backstab = 2;
                Thief.sneakSilently = 7 + agilityModifier;
                Thief.hideInShadows = 5 + agilityModifier;
                Thief.pickPocket = 7 + agilityModifier;
                Thief.climbSheerSurfaces = 7 + agilityModifier;
                Thief.pickLock = 5 + agilityModifier;
                Thief.findTrap = 5 + intelligenceModifier;
                Thief.disableTrap = 5 + agilityModifier;
                Thief.forgeDocument = 7 + personalityModifier;
                Thief.disguiseSelf = 1 + personalityModifier;
                Thief.readLanguages = 2 + intelligenceModifier;
                Thief.handlePoison = 1;
                Thief.castSpellFromScroll = "d14 " + operator;
                break;
            case 4:
                Thief.backstab = 3;
                Thief.sneakSilently = 8 + agilityModifier;
                Thief.hideInShadows = 7 + agilityModifier;
                Thief.pickPocket = 8 + agilityModifier;
                Thief.climbSheerSurfaces = 8 + agilityModifier;
                Thief.pickLock = 7 + agilityModifier;
                Thief.findTrap = 7 + intelligenceModifier;
                Thief.disableTrap = 7 + agilityModifier;
                Thief.forgeDocument = 8 + personalityModifier;
                Thief.disguiseSelf = 2 + personalityModifier;
                Thief.readLanguages = 3 + intelligenceModifier;
                Thief.handlePoison = 2;
                Thief.castSpellFromScroll = "d14 " + operator;
                break;
            case 5:
                Thief.backstab = 4;
                Thief.sneakSilently = 9 + agilityModifier;
                Thief.hideInShadows = 8 + agilityModifier;
                Thief.pickPocket = 9 + agilityModifier;
                Thief.climbSheerSurfaces = 9 + agilityModifier;
                Thief.pickLock = 8 + agilityModifier;
                Thief.findTrap = 8 + intelligenceModifier;
                Thief.disableTrap = 8 + agilityModifier;
                Thief.forgeDocument = 9 + personalityModifier;
                Thief.disguiseSelf = 3 + personalityModifier;
                Thief.readLanguages = 4 + intelligenceModifier;
                Thief.handlePoison = 3;
                Thief.castSpellFromScroll = "d16 " + operator;
                break;
            case 6:
                Thief.backstab = 5;
                Thief.sneakSilently = 11 + agilityModifier;
                Thief.hideInShadows = 9 + agilityModifier;
                Thief.pickPocket = 11 + agilityModifier;
                Thief.climbSheerSurfaces = 11 + agilityModifier;
                Thief.pickLock = 9 + agilityModifier;
                Thief.findTrap = 9 + intelligenceModifier;
                Thief.disableTrap = 9 + agilityModifier;
                Thief.forgeDocument = 11 + personalityModifier;
                Thief.disguiseSelf = 4 + personalityModifier;
                Thief.readLanguages = 5 + intelligenceModifier;
                Thief.handlePoison = 4;
                Thief.castSpellFromScroll = "d16 " + operator;
                break;
            case 7:
                Thief.backstab = 6;
                Thief.sneakSilently = 12 + agilityModifier;
                Thief.hideInShadows = 10 + agilityModifier;
                Thief.pickPocket = 12 + agilityModifier;
                Thief.climbSheerSurfaces = 12 + agilityModifier;
                Thief.pickLock = 10 + agilityModifier;
                Thief.findTrap = 10 + intelligenceModifier;
                Thief.disableTrap = 10 + agilityModifier;
                Thief.forgeDocument = 12 + personalityModifier;
                Thief.disguiseSelf = 5 + personalityModifier;
                Thief.readLanguages = 6 + intelligenceModifier;
                Thief.handlePoison = 5;
                Thief.castSpellFromScroll = "d20 " + operator;
                break;
            case 8:
                Thief.backstab = 7;
                Thief.sneakSilently = 13 + agilityModifier;
                Thief.hideInShadows = 11 + agilityModifier;
                Thief.pickPocket = 13 + agilityModifier;
                Thief.climbSheerSurfaces = 13 + agilityModifier;
                Thief.pickLock = 11 + agilityModifier;
                Thief.findTrap = 11 + intelligenceModifier;
                Thief.disableTrap = 11 + agilityModifier;
                Thief.forgeDocument = 13 + personalityModifier;
                Thief.disguiseSelf = 6 + personalityModifier;
                Thief.readLanguages = 7 + intelligenceModifier;
                Thief.handlePoison = 6;
                Thief.castSpellFromScroll = "d20 " + operator;
                break;
            case 9:
                Thief.backstab = 8;
                Thief.sneakSilently = 14 + agilityModifier;
                Thief.hideInShadows = 12 + agilityModifier;
                Thief.pickPocket = 14 + agilityModifier;
                Thief.climbSheerSurfaces = 14 + agilityModifier;
                Thief.pickLock = 12 + agilityModifier;
                Thief.findTrap = 12 + intelligenceModifier;
                Thief.disableTrap = 12 + agilityModifier;
                Thief.forgeDocument = 14 + personalityModifier;
                Thief.disguiseSelf = 7 + personalityModifier;
                Thief.readLanguages = 8 + intelligenceModifier;
                Thief.handlePoison = 7;
                Thief.castSpellFromScroll = "d20 " + operator;
                break;
            case 10:
                Thief.backstab = 9;
                Thief.sneakSilently = 15 + agilityModifier;
                Thief.hideInShadows = 13 + agilityModifier;
                Thief.pickPocket = 15 + agilityModifier;
                Thief.climbSheerSurfaces = 15 + agilityModifier;
                Thief.pickLock = 13 + agilityModifier;
                Thief.findTrap = 13 + intelligenceModifier;
                Thief.disableTrap = 13 + agilityModifier;
                Thief.forgeDocument = 15 + personalityModifier;
                Thief.disguiseSelf = 8 + personalityModifier;
                Thief.readLanguages = 9 + intelligenceModifier;
                Thief.handlePoison = 8;
                Thief.castSpellFromScroll = "d20 " + operator;
                break;

        }

    } else if (alignment.indexOf("Chaotic") != -1) {
        switch (level) {
            case 1:
                Thief.backstab = 3;
                Thief.sneakSilently = 3 + agilityModifier;
                Thief.hideInShadows = 1 + agilityModifier;
                Thief.pickPocket = 0 + agilityModifier;
                Thief.climbSheerSurfaces = 1 + agilityModifier;
                Thief.pickLock = 1 + agilityModifier;
                Thief.findTrap = 1 + intelligenceModifier;
                Thief.disableTrap = 0 + agilityModifier;
                Thief.forgeDocument = 0 + personalityModifier;
                Thief.disguiseSelf = 3 + personalityModifier;
                Thief.readLanguages = 0 + intelligenceModifier;
                Thief.handlePoison = 3;
                Thief.castSpellFromScroll = "d10 " + operator;
                break;
            case 2:
                Thief.backstab = 5;
                Thief.sneakSilently = 5 + agilityModifier;
                Thief.hideInShadows = 3 + agilityModifier;
                Thief.pickPocket = 1 + agilityModifier;
                Thief.climbSheerSurfaces = 3 + agilityModifier;
                Thief.pickLock = 3 + agilityModifier;
                Thief.findTrap = 3 + intelligenceModifier;
                Thief.disableTrap = 1 + agilityModifier;
                Thief.forgeDocument = 0 + personalityModifier;
                Thief.disguiseSelf = 5 + personalityModifier;
                Thief.readLanguages = 0 + intelligenceModifier;
                Thief.handlePoison = 5;
                Thief.castSpellFromScroll = "d10 " + operator;
                break;
            case 3:
                Thief.backstab = 7;
                Thief.sneakSilently = 7 + agilityModifier;
                Thief.hideInShadows = 5 + agilityModifier;
                Thief.pickPocket = 2 + agilityModifier;
                Thief.climbSheerSurfaces = 5 + agilityModifier;
                Thief.pickLock = 5 + agilityModifier;
                Thief.findTrap = 5 + intelligenceModifier;
                Thief.disableTrap = 2 + agilityModifier;
                Thief.forgeDocument = 1 + personalityModifier;
                Thief.disguiseSelf = 7 + personalityModifier;
                Thief.readLanguages = 1 + intelligenceModifier;
                Thief.handlePoison = 7;
                Thief.castSpellFromScroll = "d12 " + operator;
                break;
            case 4:
                Thief.backstab = 8;
                Thief.sneakSilently = 8 + agilityModifier;
                Thief.hideInShadows = 7 + agilityModifier;
                Thief.pickPocket = 3 + agilityModifier;
                Thief.climbSheerSurfaces = 7 + agilityModifier;
                Thief.pickLock = 7 + agilityModifier;
                Thief.findTrap = 7 + intelligenceModifier;
                Thief.disableTrap = 3 + agilityModifier;
                Thief.forgeDocument = 2 + personalityModifier;
                Thief.disguiseSelf = 8 + personalityModifier;
                Thief.readLanguages = 2 + intelligenceModifier;
                Thief.handlePoison = 8;
                Thief.castSpellFromScroll = "d12 " + operator;
                break;
            case 5:
                Thief.backstab = 9;
                Thief.sneakSilently = 9 + agilityModifier;
                Thief.hideInShadows = 8 + agilityModifier;
                Thief.pickPocket = 4 + agilityModifier;
                Thief.climbSheerSurfaces = 8 + agilityModifier;
                Thief.pickLock = 8 + agilityModifier;
                Thief.findTrap = 8 + intelligenceModifier;
                Thief.disableTrap = 4 + agilityModifier;
                Thief.forgeDocument = 3 + personalityModifier;
                Thief.disguiseSelf = 9 + personalityModifier;
                Thief.readLanguages = 3 + intelligenceModifier;
                Thief.handlePoison = 9;
                Thief.castSpellFromScroll = "d14 " + operator;
                break;
            case 6:
                Thief.backstab = 11;
                Thief.sneakSilently = 11 + agilityModifier;
                Thief.hideInShadows = 9 + agilityModifier;
                Thief.pickPocket = 5 + agilityModifier;
                Thief.climbSheerSurfaces = 9 + agilityModifier;
                Thief.pickLock = 9 + agilityModifier;
                Thief.findTrap = 9 + intelligenceModifier;
                Thief.disableTrap = 5 + agilityModifier;
                Thief.forgeDocument = 4 + personalityModifier;
                Thief.disguiseSelf = 11 + personalityModifier;
                Thief.readLanguages = 4 + intelligenceModifier;
                Thief.handlePoison = 11;
                Thief.castSpellFromScroll = "d14 " + operator;
                break;
            case 7:
                Thief.backstab = 12;
                Thief.sneakSilently = 12 + agilityModifier;
                Thief.hideInShadows = 10 + agilityModifier;
                Thief.pickPocket = 6 + agilityModifier;
                Thief.climbSheerSurfaces = 10 + agilityModifier;
                Thief.pickLock = 10 + agilityModifier;
                Thief.findTrap = 10 + intelligenceModifier;
                Thief.disableTrap = 6 + agilityModifier;
                Thief.forgeDocument = 5 + personalityModifier;
                Thief.disguiseSelf = 12 + personalityModifier;
                Thief.readLanguages = 5 + intelligenceModifier;
                Thief.handlePoison = 12;
                Thief.castSpellFromScroll = "d16 " + operator;
                break;
            case 8:
                Thief.backstab = 13;
                Thief.sneakSilently = 13 + agilityModifier;
                Thief.hideInShadows = 11 + agilityModifier;
                Thief.pickPocket = 7 + agilityModifier;
                Thief.climbSheerSurfaces = 11 + agilityModifier;
                Thief.pickLock = 11 + agilityModifier;
                Thief.findTrap = 11 + intelligenceModifier;
                Thief.disableTrap = 7 + agilityModifier;
                Thief.forgeDocument = 6 + personalityModifier;
                Thief.disguiseSelf = 13 + personalityModifier;
                Thief.readLanguages = 6 + intelligenceModifier;
                Thief.handlePoison = 13;
                Thief.castSpellFromScroll = "d16 " + operator;
                break;
            case 9:
                Thief.backstab = 14;
                Thief.sneakSilently = 14 + agilityModifier;
                Thief.hideInShadows = 12 + agilityModifier;
                Thief.pickPocket = 8 + agilityModifier;
                Thief.climbSheerSurfaces = 12 + agilityModifier;
                Thief.pickLock = 12 + agilityModifier;
                Thief.findTrap = 12 + intelligenceModifier;
                Thief.disableTrap = 8 + agilityModifier;
                Thief.forgeDocument = 7 + personalityModifier;
                Thief.disguiseSelf = 14 + personalityModifier;
                Thief.readLanguages = 7 + intelligenceModifier;
                Thief.handlePoison = 14;
                Thief.castSpellFromScroll = "d20 " + operator;
                break;
            case 10:
                Thief.backstab = 15;
                Thief.sneakSilently = 15 + agilityModifier;
                Thief.hideInShadows = 13 + agilityModifier;
                Thief.pickPocket = 9 + agilityModifier;
                Thief.climbSheerSurfaces = 13 + agilityModifier;
                Thief.pickLock = 13 + agilityModifier;
                Thief.findTrap = 13 + intelligenceModifier;
                Thief.disableTrap = 9 + agilityModifier;
                Thief.forgeDocument = 8 + personalityModifier;
                Thief.disguiseSelf = 15 + personalityModifier;
                Thief.readLanguages = 8 + intelligenceModifier;
                Thief.handlePoison = 15;
                Thief.castSpellFromScroll = "d20 " + operator;
                break;

        }

    }

};

Thief.generateRandomLanguage = function(num){
    var language = "";

    if (num > 0 && num <= 15) {
        language = "Alignment tongue";
        return language;
    } else if (num > 15 && num <= 20){
        language = "Chaos";
        return language;
    } else if (num > 20 && num <= 25){
        language = "Law";
        return language;
    } else if (num > 25 && num <= 30){
        language = "Neutrality";
        return language;
    } else if (num > 30 && num <= 32){
        language = "Dwarf";
        return language;
    } else if (num > 32 && num <= 34){
        language = "Elf";
        return language;
    } else if (num > 35 && num <= 44){
        language = "Halfling";
        return language;
    } else if (num > 44 && num <= 49){
        language = "Gnome";
        return language;
    } else if (num > 49 && num <= 54){
        language = "Bugbear";
        return language;
    }else if (num > 54 && num <= 64){
        language = "Goblin";
        return language;
    } else if (num > 64 && num <= 69){
        language = "Gnoll";
        return language;
    } else if (num > 69 && num <= 71){
        language = "Harpy";
        return language;
    } else if (num > 71 && num <= 74){
        language = "Hobgoblin";
        return language;
    } else if (num > 74 && num <= 78){
        language = "Kobold";
        return language;
    } else if (num > 78 && num <= 79){
        language = "Lizard man";
        return language;
    } else if (num > 79 && num <= 81){
        language = "Serpent-man";
        return language;
    } else if (num > 81 && num <= 83){
        language = "Troglodyte";
        return language;
    } else if (num > 83 && num <= 84){
        language = "Demonic";
        return language;
    } else if (num > 84 && num <= 85){
        language = "Doppelganger";
        return language;
    } else if (num > 85 && num <= 87){
        language = "Dragon";
        return language;
    } else if (num > 87 && num <= 89){
        language = "Pixie";
        return language;
    } else if (num > 89 && num <= 91){
        language = "Giant";
        return language;
    } else if (num > 91 && num <= 100){
        language = "Undercommon";
        return language;
    }

};