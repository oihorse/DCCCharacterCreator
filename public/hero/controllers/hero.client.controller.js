/**
 * Created by chris on 6/26/15.
 */
angular.module('hero').controller('HeroController', ['$scope',
    '$routeParams', '$location', 'Authentication', 'Hero',
    function ($scope, $routeParams, $location, Authentication, Hero) {
        $scope.authentication = Authentication;
        var character = {};

        //Generates random things
        var randomizer = function (minimum, maximum) {

            return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;

        };

        //Lucky Roll table
        var luckyRoll = [
            {name: "Harsh Winter: All attack rolls"},
            {name: "The bull: Melee attack rolls"},
            {name: "Fortunate date: Missile fire attack rolls"},
            {name: "Raised by wolves: Unarmed attack rolls"},
            {name: "Conceived on horseback: Mounted attack rolls"},
            {name: "Born on the battlefield: Damage rolls"},
            {name: "Path of the bear: Melee damage rolls"},
            {name: "Hawkeye: Missle fire damage rolls"},
            {name: "Pack hunter: Attack and damage rolls for 0-level starting weapon"},
            {name: "Born under the loom: Skill checks (including thief skills)"},
            {name: "Fox's cunning: Find/disarm traps"},
            {name: "Four-leafed clover: Find secret doors"},
            {name: "Seventh son: Spell checks"},
            {name: "The raging storm: Spell damage"},
            {name: "Righteous heart: Turn unholy checks"},
            {name: "Survived the plague: Magical healing"},
            {name: "Lucky sign: Saving throws"},
            {name: "Guardian angel: Saving throws to escape traps"},
            {name: "Survived a spider bite: Savings throws against poison"},
            {name: "Struck by lightning: Reflex saving throws"},
            {name: "Lived through famine: Fortitude saving throws"},
            {name: "Resisted temptation: Willpower saving throws"},
            {name: "Charmed house: Armor Class"},
            {name: "Speed of the cobra: Initiative"},
            {name: "Bountiful harvest: Hit points (applies at each level)"},
            {name: "Warrior's arm: Critical hit tables"},
            {name: "Unholy house: Corruption rolls"},
            {name: "The Broken Star: Fumbles"},
            {name: "Birdsong: Number of languages"},
            {name: "Wild child: Speed (each +1/-1 = +5'/-5' speed)"}
        ];


        //Modifier table
        var abilityModifiers = [
            {score: 3, modifier: -3},
            {score: 4, modifier: -2},
            {score: 5, modifier: -2},
            {score: 6, modifier: -1},
            {score: 7, modifier: -1},
            {score: 8, modifier: -1},
            {score: 9, modifier: 0},
            {score: 10, modifier: 0},
            {score: 11, modifier: 0},
            {score: 12, modifier: 0},
            {score: 13, modifier: 1},
            {score: 14, modifier: 1},
            {score: 15, modifier: 1},
            {score: 16, modifier: 2},
            {score: 17, modifier: 2},
            {score: 18, modifier: 3}
        ];

        var randomStats = function () {
            character.strength = abilityModifiers[randomizer(0, 15)];
            character.agility = abilityModifiers[randomizer(0, 15)];
            character.stamina = abilityModifiers[randomizer(0, 15)];
            character.personality = abilityModifiers[randomizer(0, 15)];
            character.luck = abilityModifiers[randomizer(0, 15)];
            character.intelligence = abilityModifiers[randomizer(0, 15)];
            character.luckyRoll = luckyRoll[randomizer(0, 29)];

        };

        var createCharacter = function () {
            randomStats();

        };


        $scope.create = function () {
            createCharacter();
            generateTitle(this.level, this.alignment, this.charClass);
            generateSavingThrowModifiers(this.charClass, this.level, character.personality);
            randomOccupation(this.charClass);
            generateCharacterSpeed(this.charClass);
            generateInitiativeRoll(this.charClass, this.level);
            generateCritTable(this.charClass, this.level);
            generateAttackBonus(this.charClass, this.level);
            generateCritDie(this.charClass, this.level);
            generateActionDie(this.charClass, this.level);
            generateAttackModifiers();

            var hero = new Hero({
                characterName: this.characterName,
                level: this.level,
                charClass: this.charClass,
                charAbilities: character,
                alignment: this.alignment,
                title: character.title,
                occupation: character.occupation,
                speed: character.speed,
                initiative: character.initiative,
                critTable: character.critTable,
                critDie: character.critDie,
                attackBonus: character.attackBonus,
                actionDie: character.actionDie,
                meleeBonus: character.meleeAttackBonus,
                missileBonus: character.missileAttackBonus

            });
            hero.$save(function (response) {
                $location.path('hero/' + response._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });

        };

        $scope.find = function () {
            $scope.hero = Hero.query();
        };

        $scope.findOne = function () {
            $scope.hero = Hero.get({
                heroId: $routeParams.heroId
            });
        };

        $scope.update = function () {
            $scope.hero.$update(function () {
                $location.path('hero/' + $scope.hero._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };


        //Generate title
        var generateTitle = function (level, alignment, charClass) {
            if (charClass) {

                if (charClass.indexOf('Warrior') != -1) {

                    if (level && alignment) {

                        character.title = Warrior.getWarriorTitle(alignment, level);
                    }
                }
                if (charClass.indexOf('Thief') != -1) {

                    if (level && alignment) {

                        character.title = Thief.getThiefTitle(alignment, level);
                        //$scope.generateClassSpecifics();

                    }
                }
                if (charClass.indexOf('Cleric') != -1) {

                    if (level && alignment) {

                        character.title = Cleric.getClericTitle(alignment, level);
                    }
                }
                if (charClass.indexOf('Wizard') != -1) {

                    if (level && alignment) {

                        character.title = Wizard.getWizardTitle(alignment, level);
                    }
                }
                if (charClass.indexOf('Dwarven') != -1) {

                    if (level && alignment) {

                        character.title = Dwarf.getDwarfTitle(alignment, level);
                    }
                }
                if (charClass.indexOf('Elven') != -1) {

                    if (level) {

                        character.title = Elf.getElfTitle(level);
                    }
                }
                if (charClass.indexOf('Halfling') != -1) {

                    if (level) {

                        character.title = Halfling.getHalflingTitle(level);
                    }
                }
            }
        };

        //generate saving throw modifiers
        var generateSavingThrowModifiers = function (charClass, level, personality) {
            if (charClass) {
                if (charClass.indexOf('Warrior') != -1) {

                    if (level && personality) {

                        character.willPowerSave = character.personality.modifier + Warrior.willPowerBonus[level - 1];
                        character.fortitudeSave = character.stamina.modifier + Warrior.fortitudeBonus[level - 1];
                        character.reflexSave = character.agility.modifier + Warrior.reflexBonus[level - 1];

                    }
                }
                if (charClass.indexOf('Thief') != -1) {

                    if (level && personality) {

                        character.willPowerSave = character.personality.modifier + Thief.willPowerBonus[level - 1];
                        character.fortitudeSave = character.stamina.modifier + Thief.fortitudeBonus[level - 1];
                        character.reflexSave = character.agility.modifier + Thief.reflexBonus[level - 1];

                    }
                }
                if (charClass.indexOf('Cleric') != -1) {

                    if (level && personality) {

                        character.willPowerSave = character.personality.modifier + Cleric.willPowerBonus[level - 1];
                        character.fortitudeSave = character.stamina.modifier + Cleric.fortitudeBonus[level - 1];
                        character.reflexSave = character.agility.modifier + Cleric.reflexBonus[level - 1];

                    }
                }
                if (charClass.indexOf('Wizard') != -1) {

                    if (level && personality) {

                        character.willPowerSave = character.personality.modifier + Wizard.willPowerBonus[level - 1];
                        character.fortitudeSave = character.stamina.modifier + Wizard.fortitudeBonus[level - 1];
                        character.reflexSave = character.agility.modifier + Wizard.reflexBonus[level - 1];

                    }
                }
                if (charClass.indexOf('Dwarf') != -1) {

                    if (level && personality) {

                        character.willPowerSave = character.personality.modifier + Dwarf.willPowerBonus[level - 1];
                        character.fortitudeSave = character.stamina.modifier + Dwarf.fortitudeBonus[level - 1];
                        character.reflexSave = character.agility.modifier + Dwarf.reflexBonus[level - 1];

                    }
                }
                if (charClass.indexOf('Elf') != -1) {

                    if (level && personality) {

                        character.willPowerSave = character.personality.modifier + Elf.willPowerBonus[level - 1];
                        character.fortitudeSave = character.stamina.modifier + Elf.fortitudeBonus[level - 1];
                        character.reflexSave = character.agility.modifier + Elf.reflexBonus[level - 1];

                    }
                }
                if (charClass.indexOf('Halfling') != -1) {

                    if (level && personality) {

                        character.willPowerSave = character.personality.modifier + Halfling.willPowerBonus[level - 1];
                        character.fortitudeSave = character.stamina.modifier + Halfling.fortitudeBonus[level - 1];
                        character.reflexSave = character.agility.modifier + Halfling.reflexBonus[level - 1];

                    }
                }
            }
        };


        //Generates random occupation
        var randomOccupation = function (charClass) {
            if (charClass.indexOf('Dwarf') != -1) {
                var randomOccResult = randomizer(0, 7);
                character.occupation = dwarfOccupation[randomOccResult];
            } else if (charClass.indexOf('Elf') != -1) {
                var randomOccResult = randomizer(0, 7);
                character.occupation = elfOccupation[randomOccResult];
            } else if (charClass.indexOf('Halfling') != -1) {
                var randomOccResult = randomizer(0, 8);
                character.occupation = halflingOccupation[randomOccResult];
            } else {
                var randomOccResult = randomizer(0, 53);
                character.occupation = humanOccupation[randomOccResult];
            }

        };


        var dwarfOccupation = [
            {occupation: 'Dwarven apothecarist', equipment: 'Steel vial', startingWeapon: 'Cudgel (as staff)'},
            {occupation: 'Dwarven blacksmith', equipment: 'Mithril, 1 oz.', startingWeapon: 'Hammer (as club)'},
            {occupation: 'Dwarven chest-maker', equipment: 'Wood, 10 lbs.', startingWeapon: 'Chisel (as dagger)'},
            {occupation: 'Dwarven herder', equipment: 'Sow', startingWeapon: 'Staff'},
            {occupation: 'Dwarven miner', equipment: 'Lantern', startingWeapon: 'Pick (as club)'},
            {occupation: 'Dwarven mushroom-farmer', equipment: 'Sack', startingWeapon: 'Shovel'},
            {occupation: 'Dwarven Rat-catcher', equipment: 'Net', startingWeapon: 'Club'},
            {occupation: 'Dwarven Stonemason', equipment: 'Fine Stone 10 lbs.', startingWeapon: 'Hammer'}
        ];

        var elfOccupation = [
            {occupation: 'Elven artisan', equipment: 'Clay, 1 lb.', startingWeapon: 'Staff'},
            {occupation: 'Elven barrister', equipment: 'Book', startingWeapon: 'Quill (as dart)'},
            {occupation: 'Elven chandler', equipment: 'Candles, 20', startingWeapon: 'Scissors (as dagger)'},
            {occupation: 'Elven falconer', equipment: 'Falcon', startingWeapon: 'Dagger'},
            {occupation: 'Elven forester', equipment: 'Herbs, 1 lb.', startingWeapon: 'Staff'},
            {occupation: 'Elven glassblower', equipment: 'Glass beads', startingWeapon: 'Hammer'},
            {occupation: 'Elven navigator', equipment: 'Spyglass', startingWeapon: 'Bow'},
            {occupation: 'Elven sage', equipment: 'Parchment and quill pen', startingWeapon: 'Dagger'}
        ];

        var halflingOccupation = [
            {occupation: 'Halfling chicken butcher', equipment: 'Chicken meat, 5 lbs.', startingWeapon: 'Hand axe'},
            {occupation: 'Halfling dyer', equipment: 'Fabric, 3 yards', startingWeapon: 'Staff'},
            {occupation: 'Halfling glovemaker', equipment: 'Gloves, 4 pairs', startingWeapon: 'Awl (as dagger)'},
            {occupation: 'Halfling gypsy', equipment: 'Hex doll', startingWeapon: 'Sling'},
            {
                occupation: 'Halfling haberdasher',
                equipment: 'Fine suits, 3 sets',
                startingWeapon: 'Scissors (as dagger)'
            },
            {occupation: 'Halfling mariner', equipment: 'Sailcloth, 2 yards', startingWeapon: 'Knife (as dagger)'},
            {occupation: 'Halfling moneylender', equipment: '5 gp, 10 sp , 200 cp', startingWeapon: 'Short sword'},
            {occupation: 'Halfling trader', equipment: '20 sp', startingWeapon: 'Short sword'},
            {occupation: 'Halfling vagrant', equipment: 'Begging bowl', startingWeapon: 'Club'}
        ];


        //Occupations Table
        var humanOccupation = [
            {occupation: 'Alchemist', equipment: 'Oil, 1 flask', startingWeapon: 'Staff'},
            {occupation: 'Animal Trainer', equipment: 'Pony', startingWeapon: 'Club'},
            {occupation: 'Armorer', equipment: 'Iron helmet', startingWeapon: 'Hammer (as club)'},
            {occupation: 'Astrologer', equipment: 'Spyglass', startingWeapon: 'Dagger'},
            {occupation: 'Barber', equipment: 'Scissors', startingWeapon: 'Razor (as dagger)'},
            {occupation: 'Beadle', equipment: 'Holy symbol', startingWeapon: 'Staff'},
            {occupation: 'Beekeeper', equipment: 'Jar of honey', startingWeapon: 'Staff'},
            {occupation: 'Blacksmith', equipment: 'Steel tongs', startingWeapon: 'Hammer (as club)'},
            {occupation: 'Butcher', equipment: 'Side of beef', startingWeapon: 'Cleaver (as axe)'},
            {occupation: 'Caravan Guard', equipment: 'Linen, 1 yard', startingWeapon: 'Short sword'},
            {occupation: 'Cheesemaker', equipment: 'Stinky cheese', startingWeapon: 'Cudgel (as staff)'},
            {occupation: 'Cobbler', equipment: 'Shoehorn', startingWeapon: 'Awl (as dagger)'},
            {occupation: 'Confidence artist', equipment: 'Quality cloak', startingWeapon: 'Dagger'},
            {occupation: 'Cooper', equipment: 'Barrel', startingWeapon: 'Crowbar (as club)'},
            {occupation: 'Costermonger', equipment: 'Fruit', startingWeapon: 'Knife (as dagger)'},
            {occupation: 'Cutpurse', equipment: 'Small chest', startingWeapon: 'Dagger'},
            {occupation: 'Ditch Digger', equipment: 'Fine dirt, 1 lb.', startingWeapon: 'Shovel (as staff)'},
            {occupation: 'Farmer', equipment: 'Hen', startingWeapon: 'Pitchfork (as spear)'},
            {occupation: 'Fortune-teller', equipment: 'Tarot deck', startingWeapon: 'Dagger'},
            {occupation: 'Gambler', equipment: 'Dice', startingWeapon: 'Club'},
            {occupation: 'Gongfarmer', equipment: 'Sack of night soil', startingWeapon: 'Trowel (as dagger)'},
            {occupation: 'Grave digger', equipment: 'Trowel', startingWeapon: 'Shovel (as staff)'},
            {occupation: 'Guild beggar', equipment: 'Crutches', startingWeapon: 'Sling'},
            {occupation: 'Healer', equipment: 'Holy water, 1 vial', startingWeapon: 'Club'},
            {occupation: 'Herbalist', equipment: 'Herbs, 1 lb.', startingWeapon: 'Club'},
            {occupation: 'Herder', equipment: 'Herding dog', startingWeapon: 'Staff'},
            {occupation: 'Hunter', equipment: 'Deer pelt', startingWeapon: 'Shortbow'},
            {occupation: 'Indentured servant', equipment: 'Locket', startingWeapon: 'Staff'},
            {occupation: 'Jester', equipment: 'Silk clothes', startingWeapon: 'Dart'},
            {occupation: 'Jewler', equipment: 'Gem worth 20 gp', startingWeapon: 'Dagger'},
            {occupation: 'Locksmith', equipment: 'Fine tools', startingWeapon: 'Dagger'},
            {occupation: 'Mendicant', equipment: 'Cheese dip', startingWeapon: 'Club'},
            {occupation: 'Mercenary', equipment: 'Hide armor', startingWeapon: 'Longsword'},
            {occupation: 'Merchant', equipment: '4 gp, 15 sp, 27 cp', startingWeapon: 'Dagger'},
            {occupation: 'Miller/baker', equipment: 'Flour, 1 lb.', startingWeapon: 'Club'},
            {occupation: 'Minstrel', equipment: 'Ukulele', startingWeapon: 'Dagger'},
            {occupation: 'Noble', equipment: 'Gold ring worth 10 gp', startingWeapon: 'Longsword'},
            {occupation: 'Orphan', equipment: 'Rag doll', startingWeapon: 'Club'},
            {occupation: 'Ostler', equipment: 'Bridle', startingWeapon: 'Staff'},
            {occupation: 'Outlaw', equipment: 'Leather armor', startingWeapon: 'Short sword'},
            {occupation: 'Rope maker', equipment: 'Rope, 100\'', startingWeapon: 'Knife (as dagger)'},
            {occupation: 'Scribe', equipment: 'Parchment, 10 sheets', startingWeapon: 'Dart'},
            {occupation: 'Shaman', equipment: 'Herbs, 1 lb.', startingWeapon: 'Mace'},
            {occupation: 'Slave', equipment: 'Strange-looking rock', startingWeapon: 'Club'},
            {occupation: 'Smuggler', equipment: 'Waterproof sack', startingWeapon: 'Sling'},
            {occupation: 'Soldier', equipment: 'Shield', startingWeapon: 'Spear'},
            {occupation: 'Squire', equipment: 'Steel helmet', startingWeapon: 'Longsword'},
            {occupation: 'Tax collector', equipment: '100 cp', startingWeapon: 'Longsword'},
            {occupation: 'Trapper', equipment: 'Badger pelt', startingWeapon: 'Sling'},
            {occupation: 'Urchin', equipment: 'begging bowl', startingWeapon: 'Stick (as club)'},
            {occupation: 'Wainwright', equipment: 'Pushcart', startingWeapon: 'Club'},
            {occupation: 'Weaver', equipment: 'Fine suit of clothes', startingWeapon: 'Dagger'},
            {occupation: 'Wizard\'s apprentice', equipment: 'Black grimoire', startingWeapon: 'Dagger'},
            {occupation: 'Woodcutter', equipment: 'Bundle of wood', startingWeapon: 'Handaxe'}
        ];

        var generateCharacterSpeed = function (charClass) {
            if (charClass.indexOf('Dwarf') != -1) {
                character.speed = 20;

            } else if (charClass.indexOf('Elf') != -1) {
                character.speed = 30;

            } else if (charClass.indexOf('Halfling') != -1) {
                character.speed = 20;

            } else {
                character.speed = 30;
            }
        };

        //Generate the initiative roll
        var generateInitiativeRoll = function (charClass, level) {
            var initiative = 0;

            if (charClass && level) {
                if (charClass.indexOf('Warrior') != -1) {

                    initiative += parseInt(level, 10);
                }
            }

            if (character.agility) {
                initiative += character.agility.modifier;
            }

            //build text string
            var initiativeText;

            if (initiative >= 0) {
                initiativeText = "1d20 + ";
            }
            else {
                initiativeText = "1d20 ";
            }


            return character.initiative = initiativeText + initiative;

        };

        //Generate crit Table
        var generateCritTable = function (charClass, level) {
            if (charClass) {
                if (charClass.indexOf('Warrior') != -1) {

                    if (level) {

                        character.critTable = Warrior.generateCritTable(level);
                    }
                }
                if (charClass.indexOf('Thief') != -1) {

                    if (level) {

                        character.critTable = Thief.generateCritTable();
                    }
                }
                if (charClass.indexOf('Cleric') != -1) {

                    if (level) {

                        character.critTable = Cleric.generateCritTable();
                    }
                }
                if (charClass.indexOf('Wizard') != -1) {

                    if (level) {

                        character.critTable = Wizard.generateCritTable();
                    }
                }
                if (charClass.indexOf('Dwarven') != -1) {

                    if (level) {

                        character.critTable = Dwarf.generateCritTable();
                    }
                }
            }
            if (charClass.indexOf('Elven') != -1) {

                if (level) {

                    character.critTable = Elf.generateCritTable();
                }
            }
            if (charClass.indexOf('Halfling') != -1) {

                if (level) {

                    character.critTable = Halfling.generateCritTable();
                }
            }
        };

        //Generate crit Die
        var generateCritDie = function (charClass, level) {
            if (charClass) {
                if (charClass.indexOf('Warrior') != -1) {

                    if (level) {

                        character.critDie = Warrior.critDie[level - 1];


                    }
                }
                if (charClass.indexOf('Thief') != -1) {

                    if (level) {

                        character.critDie = Thief.critDie[level - 1];

                    }
                }
                if (charClass.indexOf('Cleric') != -1) {

                    if (level) {

                        charClass.critDie = Cleric.critDie[level - 1];


                    }
                }
                if (charClass.indexOf('Wizard') != -1) {

                    if (level) {

                        character.critDie = Wizard.critDie[level - 1];


                    }
                }
                if (charClass.indexOf('Dwarven') != -1) {

                    if (level) {

                        character.critDie = Dwarf.critDie[level - 1];


                    }
                }
                if (charClass.indexOf('Elven') != -1) {

                    if (level) {

                        character.critDie = Elf.critDie[level - 1];


                    }
                }
                if (charClass.indexOf('Halfling') != -1) {

                    if (level) {

                        character.critDie = Halfling.critDie[level - 1];

                    }
                }
            }
        };

        //Generate attack bonus
        var generateAttackBonus = function (charClass, level) {
            if (charClass) {
                if (charClass.indexOf('Warrior') != -1) {

                    if (level) {

                        character.attackBonus = Warrior.attackBonus[level - 1];


                    }
                }
                if (charClass.indexOf('Thief') != -1) {

                    if (level) {

                        character.attackBonus = Thief.attackBonus[level - 1];


                    }
                }

                if (charClass.indexOf('Cleric') != -1) {

                    if (level) {

                        character.attackBonus = Cleric.attackBonus[level - 1];


                    }
                }
                if (charClass.indexOf('Wizard') != -1) {

                    if (level) {

                        character.attackBonus = Wizard.attackBonus[level - 1];


                    }
                }
            }
            if (charClass.indexOf('Dwarven') != -1) {

                if (level) {

                    character.attackBonus = Dwarf.attackBonus[level - 1];


                }
            }
            if (charClass.indexOf('Elven') != -1) {

                if (level) {

                    character.attackBonus = Elf.attackBonus[level - 1];


                }
            }
            if (charClass.indexOf('Halfling') != -1) {

                if (level) {

                    character.attackBonus = Halfling.attackBonus[level - 1];

                }
            }
        };

        //Generate action die
        var generateActionDie = function (charClass, level) {
            if (charClass) {
                if (charClass.indexOf('Warrior') != -1) {

                    if (level) {

                        character.actionDie = Warrior.actionDie[level - 1];

                    }
                }
                if (charClass.indexOf('Thief') != -1) {

                    if (level) {

                        character.actionDie = Thief.actionDie[level - 1];

                    }
                }
                if (charClass.indexOf('Cleric') != -1) {

                    if (level) {

                        character.actionDie = Cleric.actionDie[level - 1];

                    }
                }
                if (charClass.indexOf('Wizard') != -1) {

                    if (level) {

                        character.actionDie = Wizard.actionDie[level - 1];


                    }
                }
                if (charClass.indexOf('Dwarven') != -1) {

                    if (level) {

                        character.actionDie = Dwarf.actionDie[level - 1];


                    }
                }
                if (charClass.indexOf('Elven') != -1) {

                    if (level) {

                        character.actionDie = Elf.actionDie[level - 1];


                    }
                }
                if (charClass.indexOf('Halfling') != -1) {

                    if (level) {

                        character.actionDie = Halfling.actionDie[level - 1];

                    }
                }
            }
        };

        //generate attack modifiers
        var generateAttackModifiers = function () {

            if (character.agility && character.strength) {

                character.missileAttackBonus = character.agility.modifier;
                character.meleeAttackBonus = character.strength.modifier;
                character.meleeDamageBonus = character.strength.modifier;

            }

        };

    }
]);