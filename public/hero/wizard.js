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
    bonusSpellsKnown: [-16, -2, -2, -1, -1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 2, 2],
    firstLevelWizardSpells: [
        {name: 'Animal summoning'},
        {name: 'Cantrip'},
        {name: 'Charm person'},
        {name: 'Chill touch'},
        {name: 'Choking cloud'},
        {name: 'Color spray'},
        {name: 'Comprehend languages'},
        {name: 'Detect magic*'},
        {name: 'Ekim\'s mystical mask'},
        {name: 'Enlarge'},
        {name: 'Feather fall'},
        {name: 'Find familiar'},
        {name: 'Flaming hands'},
        {name: 'Force manipulation'},
        {name: 'Invoke patron**'},
        {name: 'Magic missile'},
        {name: 'Magic shield'},
        {name: 'Mending'},
        {name: 'Patron bond***'},
        {name: 'Read magic'},
        {name: 'Ropework'},
        {name: 'Runic alphabet, mortal'},
        {name: 'Sleep'},
        {name: 'Spider climb'},
        {name: 'Ventriloquism'},
        {name: 'Ward portal'},
        {name: 'Patron spell***'}
    ],
    secondLevelWizardSpells: [
        {name: 'Arcane affinity'},
        {name: 'Detect evil*'},
        {name: 'Detect invisible'},
        {name: 'ESP'},
        {name: 'Fire resistance'},
        {name: 'Forget'},
        {name: 'Invisibility'},
        {name: 'Invisible companion'},
        {name: 'Knock'},
        {name: 'Levitate'},
        {name: 'Locate object'},
        {name: 'Magic mouth'},
        {name: 'Mirror image'},
        {name: 'Monster summoning'},
        {name: 'Nythuul\'s porcupine coat'},
        {name: 'Phantasm'},
        {name: 'Ray of enfeeblement'},
        {name: 'Scare'},
        {name: 'Scorching'},
        {name: 'Shatter'},
        {name: 'Spider web'},
        {name: 'Strength'},
        {name: 'Wizard staff'},
        {name: 'Patron spell***'}
    ],
    thirdLevelWizardSpells: [
        {name: 'Binding*'},
        {name: 'Breathe life'},
        {name: 'Consult spirit'},
        {name: 'Demon summoning'},
        {name: 'Dispel magic'},
        {name: 'Eldritch hound'},
        {name: 'Emirikol\'s entropic maelstrom'},
        {name: 'Eternal champion'},
        {name: 'Fireball'},
        {name: 'Fly'},
        {name: 'Gust of wind'},
        {name: 'Haste'},
        {name: 'Lightning bolt'},
        {name: 'Make potion'},
        {name: 'Paralysis*'},
        {name: 'Planar step'},
        {name: 'Runic alphabet, fey'},
        {name: 'Slow'},
        {name: 'Sword magic'},
        {name: 'Transference'},
        {name: 'Turn to stone'},
        {name: 'Water breathing'},
        {name: 'Write magic'},
        {name: 'Patron spell'}
    ],
    fourthLevelWizardSpells: [
        {name: 'Control fire'},
        {name: 'Control ice'},
        {name: 'Lokerimon\'s orderly assistance'},
        {name: 'Polymorph'},
        {name: 'Transmute Earth'},
        {name: 'Wizard sense'}
    ],
    fifthLevelWizardSpells: [
        {name: 'Hepsoj\'s fecund fungi'},
        {name: 'Lokerimon\'s unerring hunter'},
        {name: 'Magic bulwark'},
        {name: 'Mind purge'},
        {name: 'Replication'}
    ],
    mercurial: [
        "At great cost",
        "Extremely difficult to cast",
        "Soul dedication",
        "Health bane",
        "Difficult to cast",
        "Counter-magic bubble",
        "Count of ten",
        "Anima drain",
        "Blood magic",
        "Planar rift",
        "Magic reverb",
        "Slow cast",
        "Sleep of ages",
        "Material magic",
        "Primordial channel",
        "Stolen knowledge",
        "Vermin attractor",
        "Siphon magic",
        "Rush of wind",
        "Corrosion touch",
        "Sympathetic magic",
        "Cannibal magic",
        "Prismatic distortion",
        "Terror-inducing",
        "Auditory feedback",
        "No range",
        "Odd growths",
        "Fear and loathing",
        "Memories of a dying god",
        "Unwanted attention",
        "Circumstantial magic",
        "Hairy magic",
        "Thunderstruck",
        "Joe Average",
        "Demonic voice",
        "Aura of decay",
        "Whimsical patron",
        "Blood sweat",
        "Ravenous",
        'No change',
        "No change",
        'No change',
        "No change",
        'No change',
        "No change",
        'No change',
        "No change",
        'No change',
        "No change",
        'No change',
        "No change",
        'No change',
        "No change",
        'No change',
        "No change",
        'No change',
        "No change",
        'No change',
        'No change',
        "No change",
        "Loud enough for you?",
        "Gender bender",
        "Diurnal / nocturnal magic",
        "Wealful / woeful magic",
        "Casting circle",
        "Accidental alchemist",
        "St. Gygakk\'s fire",
        "Mirror magic",
        "Skeletal caster",
        "Temporal echo",
        "Worms of the earth",
        "Chain casting",
        "Karmic casting",
        "Tide of ash",
        "Spell by proxy",
        "Silenced",
        "Call of the Outer Dark",
        "Mentalism",
        "Plague of rats",
        "Dimensional schism",
        "Terrible to behold",
        "Spell killer",
        "Blue star",
        "Energy burst",
        "Psychic shield",
        "Mystic twin",
        "Planar blink",
        "Rain of frogs",
        "Phase out",
        "Weatherman",
        "Breath of life",
        "Gibbering allies",
        "Greater power",
        "Fine control",
        "Psychic focus",
        "Powerful caster",
        "Necrotic drain",
        "Natural-born talent"
    ]
    //wizardSpells: [
    //    {
    //        name: "Level 1",
    //        spells: [
    //            {name: 'Animal summoning'},
    //            {name: 'Cantrip'},
    //            {name: 'Charm person'},
    //            {name: 'Chill touch'},
    //            {name: 'Choking cloud'},
    //            {name: 'Color spray'},
    //            {name: 'Comprehend languages'},
    //            {name: 'Detect magic*'},
    //            {name: 'Ekim\'s mystical mask'},
    //            {name: 'Enlarge'},
    //            {name: 'Feather fall'},
    //            {name: 'Find familiar'},
    //            {name: 'Flaming hands'},
    //            {name: 'Force manipulation'},
    //            {name: 'Invoke patron**'},
    //            {name: 'Magic missile'},
    //            {name: 'Magic shield'},
    //            {name: 'Mending'},
    //            {name: 'Patron bond***'},
    //            {name: 'Read magic'},
    //            {name: 'Ropework'},
    //            {name: 'Runic alphabet, mortal'},
    //            {name: 'Sleep'},
    //            {name: 'Spider climb'},
    //            {name: 'Ventriloquism'},
    //            {name: 'Ward portal'},
    //            {name: 'Patron spell***'}
    //        ]
    //    },
    //    {
    //        name: "Level 2",
    //        spells: [
    //            {name: 'Arcane affinity'},
    //            {name: 'Detect evil*'},
    //            {name: 'Detect invisible'},
    //            {name: 'ESP'},
    //            {name: 'Fire resistance'},
    //            {name: 'Forget'},
    //            {name: 'Invisibility'},
    //            {name: 'Invisible companion'},
    //            {name: 'Knock'},
    //            {name: 'Levitate'},
    //            {name: 'Locate object'},
    //            {name: 'Magic mouth'},
    //            {name: 'Mirror image'},
    //            {name: 'Monster summoning'},
    //            {name: 'Nythuul\'s porcupine coat'},
    //            {name: 'Phantasm'},
    //            {name: 'Ray of enfeeblement'},
    //            {name: 'Scare'},
    //            {name: 'Scorching'},
    //            {name: 'Shatter'},
    //            {name: 'Spider web'},
    //            {name: 'Strength'},
    //            {name: 'Wizard staff'},
    //            {name: 'Patron spell***'}
    //        ]
    //    },
    //    {
    //        name: "Level 3",
    //        spells: [
    //            {name: 'Binding*'},
    //            {name: 'Breathe life'},
    //            {name: 'Consult spirit'},
    //            {name: 'Demon summoning'},
    //            {name: 'Dispel magic'},
    //            {name: 'Eldritch hound'},
    //            {name: 'Emirikol\'s entropic maelstrom'},
    //            {name: 'Eternal champion'},
    //            {name: 'Fireball'},
    //            {name: 'Fly'},
    //            {name: 'Gust of wind'},
    //            {name: 'Haste'},
    //            {name: 'Lightning bolt'},
    //            {name: 'Make potion'},
    //            {name: 'Paralysis*'},
    //            {name: 'Planar step'},
    //            {name: 'Runic alphabet, fey'},
    //            {name: 'Slow'},
    //            {name: 'Sword magic'},
    //            {name: 'Transference'},
    //            {name: 'Turn to stone'},
    //            {name: 'Water breathing'},
    //            {name: 'Write magic'},
    //            {name: 'Patron spell'}
    //        ]
    //    },
    //    {
    //        name: "Level 4",
    //        spells: [
    //            {name: 'Control fire'},
    //            {name: 'Control ice'},
    //            {name: 'Lokerimon\'s orderly assistance'},
    //            {name: 'Polymorph'},
    //            {name: 'Transmute Earth'},
    //            {name: 'Wizard sense'}
    //        ]
    //    },
    //    {
    //        name: "Level 5",
    //        spells: [
    //            {name: 'Hepsoj\'s fecund fungi'},
    //            {name: 'Lokerimon\'s unerring hunter'},
    //            {name: 'Magic bulwark'},
    //            {name: 'Mind purge'},
    //            {name: 'Replication'}
    //        ]
    //    }
    //]
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

Wizard.generateRandomLanguage = function (num) {
    var language = "";

    if (num > 0 && num <= 10) {
        language = "Alignment tongue";
        return language;
    } else if (num > 10 && num <= 13) {
        language = "Chaos";
        return language;
    } else if (num > 13 && num <= 16) {
        language = "Law";
        return language;
    } else if (num > 16 && num <= 19) {
        language = "Neutrality";
        return language;
    } else if (num > 19 && num <= 21) {
        language = "Dwarf";
        return language;
    } else if (num > 21 && num <= 23) {
        language = "Elf";
        return language;
    } else if (num > 23 && num <= 25) {
        language = "Halfling";
        return language;
    } else if (num > 25 && num <= 27) {
        language = "Gnome";
        return language;
    } else if (num > 27 && num <= 29) {
        language = "Bugbear";
        return language;
    } else if (num > 29 && num <= 35) {
        language = "Goblin";
        return language;
    } else if (num > 36 && num <= 39) {
        language = "Gnoll";
        return language;
    } else if (num > 39 && num <= 41) {
        language = "Harpy";
        return language;
    } else if (num > 41 && num <= 45) {
        language = "Hobgoblin";
        return language;
    } else if (num > 45 && num <= 49) {
        language = "Kobold";
        return language;
    } else if (num > 49 && num <= 53) {
        language = "Lizard man";
        return language;
    } else if (num > 53 && num <= 55) {
        language = "Minotaur";
        return language;
    } else if (num > 55 && num <= 57) {
        language = "Ogre";
        return language;
    } else if (num > 57 && num <= 62) {
        language = "Orc";
        return language;
    } else if (num > 63 && num <= 65) {
        language = "Serpent-man";
        return language;
    } else if (num > 65 && num <= 68) {
        language = "Troglodyte";
        return language;
    } else if (num > 68 && num <= 72) {
        language = "Angelic";
        return language;
    } else if (num > 72 && num <= 73) {
        language = "Centaur";
        return language;
    } else if (num > 73 && num <= 79) {
        language = "Demonic";
        return language;
    } else if (num > 79 && num <= 80) {
        language = "Doppelganger";
        return language;
    } else if (num > 80 && num <= 84) {
        language = "Dragon";
        return language;
    } else if (num > 84 && num <= 86) {
        language = "Pixie";
        return language;
    } else if (num > 86 && num <= 88) {
        language = "Giant";
        return language;
    } else if (num > 88 && num <= 89) {
        language = "Griffon";
        return language;
    } else if (num > 89 && num <= 90) {
        language = "Naga";
        return language;
    } else if (num > 90 && num <= 92) {
        language = "Bear";
        return language;
    } else if (num > 92 && num <= 94) {
        language = "Eagle";
        return language;
    } else if (num > 94 && num <= 96) {
        language = "Horse";
        return language;
    } else if (num > 96 && num <= 98) {
        language = "Wolf";
        return language;
    } else if (num > 98 && num <= 99) {
        language = "Spider";
        return language;
    } else if (num > 99 && num <= 100) {
        language = "Undercommon";
        return language;
    }
};

Wizard.generateListOfPossibleSpells = function (currentSpellCastLevel) {

    var allowedWizardSpells = [];

    switch(currentSpellCastLevel) {
        case 1:
            allowedWizardSpells.push({name: 1, spells: Wizard.firstLevelWizardSpells});
            break;
        case 2:
            allowedWizardSpells.push({name: 1, spells: Wizard.firstLevelWizardSpells});
            allowedWizardSpells.push({name: 2, spells: Wizard.secondLevelWizardSpells});
            break;
        case 3:
            allowedWizardSpells.push({name: 1, spells: Wizard.firstLevelWizardSpells});
            allowedWizardSpells.push({name: 2, spells: Wizard.secondLevelWizardSpells});
            allowedWizardSpells.push({name: 3, spells: Wizard.thirdLevelWizardSpells});
            break;
        case 4:
            allowedWizardSpells.push({name: 1, spells: Wizard.firstLevelWizardSpells});
            allowedWizardSpells.push({name: 2, spells: Wizard.secondLevelWizardSpells});
            allowedWizardSpells.push({name: 3, spells: Wizard.thirdLevelWizardSpells});
            allowedWizardSpells.push({name: 4, spells: Wizard.fourthLevelWizardSpells});

            break;
        case 5:
            allowedWizardSpells.push({name: 1, spells: Wizard.firstLevelWizardSpells});
            allowedWizardSpells.push({name: 2, spells: Wizard.secondLevelWizardSpells});
            allowedWizardSpells.push({name: 3, spells: Wizard.thirdLevelWizardSpells});
            allowedWizardSpells.push({name: 4, spells: Wizard.fourthLevelWizardSpells});
            allowedWizardSpells.push({name: 5, spells: Wizard.fifthLevelWizardSpells});

            break;
    }
    return allowedWizardSpells;

};
