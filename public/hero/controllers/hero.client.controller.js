/**
 * Created by chris on 6/26/15.
 */
angular.module('hero').controller('HeroController', ['$scope',
    '$routeParams', '$location', 'Authentication', 'Hero',
    function ($scope, $routeParams, $location, Authentication, Hero) {
        $scope.authentication = Authentication;
        $scope.character = {};


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
            $scope.character.strength = abilityModifiers[randomizer(0, 15)];
            $scope.character.agility = abilityModifiers[randomizer(0, 15)];
            $scope.character.stamina = abilityModifiers[randomizer(0, 15)];
            $scope.character.personality = abilityModifiers[randomizer(0, 15)];
            $scope.character.luck = abilityModifiers[randomizer(0, 15)];
            $scope.character.intelligence = abilityModifiers[randomizer(0, 15)];
            $scope.character.luckyRoll = luckyRoll[randomizer(0, 29)];

        };

        var createCharacter = function () {
            randomStats();

        };


        $scope.create = function () {
            $scope.character.level = this.level;
            $scope.character.charClass = this.charClass;
            $scope.character.alignment = this.alignment;
            $scope.character.characterName = this.characterName;

            createCharacter();
            generateTitle();
            generateSavingThrowModifiers();
            randomOccupation();
            generateCharacterSpeed();
            generateInitiativeRoll();
            generateCritTable();
            generateAttackBonus();
            generateCritDie();
            generateActionDie();
            generateAttackModifiers();
            generateClassSpecifics();

            var hero = new Hero({
                characterName: $scope.characterName,
                level: $scope.character.level,
                charClass: $scope.character.charClass,
                charAbilities: $scope.character,
                alignment: $scope.character.alignment,
                title: $scope.character.title,
                occupation: $scope.character.occupation,
                speed: $scope.character.speed,
                initiative: $scope.character.initiative,
                critTable: $scope.character.critTable,
                critDie: $scope.character.critDie,
                attackBonus: $scope.character.attackBonus,
                actionDie: $scope.character.actionDie,
                meleeBonus: $scope.character.meleeAttackBonus,
                missileBonus: $scope.character.missileAttackBonus,
                classSpecific: $scope.character.classSpecific

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

        // Create a new controller method for deleting a single article
        $scope.delete = function (hero) {
            // If an article was sent to the method, delete it
            if (hero) {
                // Use the article '$remove' method to delete the article
                hero.$remove(function () {
                    // Remove the article from the articles list
                    for (var i in $scope.Hero) {
                        if ($scope.Hero[i] === hero) {
                            $scope.Hero.splice(i, 1);
                        }
                    }
                });
            } else {
                // Otherwise, use the article '$remove' method to delete the article
                $scope.hero.$remove(function () {
                    $location.path('heroes');
                });
            }
        };


        //Generate title
        var generateTitle = function () {
            if ($scope.character.charClass) {

                if ($scope.character.charClass.indexOf('Warrior') != -1) {

                    if ($scope.character.level && $scope.character.alignment) {

                        $scope.character.title = Warrior.getWarriorTitle($scope.character.alignment, $scope.character.level);
                    }
                }
                if ($scope.character.charClass.indexOf('Thief') != -1) {

                    if ($scope.character.level && $scope.character.alignment) {

                        $scope.character.title = Thief.getThiefTitle($scope.character.alignment, $scope.character.level);

                    }
                }
                if ($scope.character.charClass.indexOf('Cleric') != -1) {

                    if ($scope.character.level && $scope.character.alignment) {

                        $scope.character.title = Cleric.getClericTitle($scope.character.alignment, $scope.character.level);
                    }
                }
                if ($scope.character.charClass.indexOf('Wizard') != -1) {

                    if ($scope.character.level && $scope.character.alignment) {

                        $scope.character.title = Wizard.getWizardTitle($scope.character.alignment, $scope.character.level);
                    }
                }
                if ($scope.character.charClass.indexOf('Dwarven') != -1) {

                    if ($scope.character.level && $scope.character.alignment) {

                        $scope.character.title = Dwarf.getDwarfTitle($scope.character.alignment, $scope.character.level);
                    }
                }
                if ($scope.character.charClass.indexOf('Elven') != -1) {

                    if ($scope.character.level) {

                        $scope.character.title = Elf.getElfTitle($scope.character.level);
                    }
                }
                if ($scope.character.charClass.indexOf('Halfling') != -1) {

                    if ($scope.character.level) {

                        $scope.character.title = Halfling.getHalflingTitle($scope.character.level);
                    }
                }
            }
        };

        //generate saving throw modifiers
        var generateSavingThrowModifiers = function () {
            if ($scope.character.charClass) {
                if ($scope.character.charClass.indexOf('Warrior') != -1) {

                    if ($scope.character.level && $scope.character.personality) {

                        $scope.character.willPowerSave = $scope.character.personality.modifier + Warrior.willPowerBonus[$scope.character.level - 1];
                        $scope.character.fortitudeSave = $scope.character.stamina.modifier + Warrior.fortitudeBonus[$scope.character.level - 1];
                        $scope.character.reflexSave = $scope.character.agility.modifier + Warrior.reflexBonus[$scope.character.level - 1];

                    }
                }
                if ($scope.character.charClass.indexOf('Thief') != -1) {

                    if ($scope.character.level && $scope.character.personality) {

                        $scope.character.willPowerSave = $scope.character.personality.modifier + Thief.willPowerBonus[$scope.character.level - 1];
                        $scope.character.fortitudeSave = $scope.character.stamina.modifier + Thief.fortitudeBonus[$scope.character.level - 1];
                        $scope.character.reflexSave = $scope.character.agility.modifier + Thief.reflexBonus[$scope.character.level - 1];

                    }
                }
                if ($scope.character.charClass.indexOf('Cleric') != -1) {

                    if ($scope.character.level && $scope.character.personality) {

                        $scope.character.willPowerSave = $scope.character.personality.modifier + Cleric.willPowerBonus[$scope.character.level - 1];
                        $scope.character.fortitudeSave = $scope.character.stamina.modifier + Cleric.fortitudeBonus[$scope.character.level - 1];
                        $scope.character.reflexSave = $scope.character.agility.modifier + Cleric.reflexBonus[$scope.character.level - 1];

                    }
                }
                if ($scope.character.charClass.indexOf('Wizard') != -1) {

                    if ($scope.character.level && $scope.character.personality) {

                        $scope.character.willPowerSave = $scope.character.personality.modifier + Wizard.willPowerBonus[$scope.character.level - 1];
                        $scope.character.fortitudeSave = $scope.character.stamina.modifier + Wizard.fortitudeBonus[$scope.character.level - 1];
                        $scope.character.reflexSave = $scope.character.agility.modifier + Wizard.reflexBonus[$scope.character.level - 1];

                    }
                }
                if ($scope.character.charClass.indexOf('Dwarf') != -1) {

                    if ($scope.character.level && $scope.character.personality) {

                        $scope.character.willPowerSave = $scope.character.personality.modifier + Dwarf.willPowerBonus[$scope.character.level - 1];
                        $scope.character.fortitudeSave = $scope.character.stamina.modifier + Dwarf.fortitudeBonus[$scope.character.level - 1];
                        $scope.character.reflexSave = $scope.character.agility.modifier + Dwarf.reflexBonus[$scope.character.level - 1];

                    }
                }
                if ($scope.character.charClass.indexOf('Elf') != -1) {

                    if ($scope.character.level && $scope.character.personality) {

                        $scope.character.willPowerSave = $scope.character.personality.modifier + Elf.willPowerBonus[$scope.character.level - 1];
                        $scope.character.fortitudeSave = $scope.character.stamina.modifier + Elf.fortitudeBonus[$scope.character.level - 1];
                        $scope.character.reflexSave = $scope.character.agility.modifier + Elf.reflexBonus[$scope.character.level - 1];

                    }
                }
                if ($scope.character.charClass.indexOf('Halfling') != -1) {

                    if ($scope.character.level && $scope.character.personality) {

                        $scope.character.willPowerSave = $scope.character.personality.modifier + Halfling.willPowerBonus[$scope.character.level - 1];
                        $scope.character.fortitudeSave = $scope.character.stamina.modifier + Halfling.fortitudeBonus[$scope.character.level - 1];
                        $scope.character.reflexSave = $scope.character.agility.modifier + Halfling.reflexBonus[$scope.character.level - 1];

                    }
                }
            }
        };


        //Generates random occupation
        var randomOccupation = function () {
            if ($scope.character.charClass.indexOf('Dwarf') != -1) {
                var randomOccResult = randomizer(0, 7);
                $scope.character.occupation = dwarfOccupation[randomOccResult];
            } else if ($scope.character.charClass.indexOf('Elf') != -1) {
                var randomOccResult = randomizer(0, 7);
                $scope.character.occupation = elfOccupation[randomOccResult];
            } else if ($scope.character.charClass.indexOf('Halfling') != -1) {
                var randomOccResult = randomizer(0, 8);
                $scope.character.occupation = halflingOccupation[randomOccResult];
            } else {
                var randomOccResult = randomizer(0, 53);
                $scope.character.occupation = humanOccupation[randomOccResult];
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

        var generateCharacterSpeed = function () {
            if ($scope.character.charClass.indexOf('Dwarf') != -1) {
                $scope.character.speed = 20;

            } else if ($scope.character.charClass.indexOf('Elf') != -1) {
                $scope.character.speed = 30;

            } else if ($scope.character.charClass.indexOf('Halfling') != -1) {
                $scope.character.speed = 20;

            } else {
                $scope.character.speed = 30;
            }
        };

        //Generate the initiative roll
        var generateInitiativeRoll = function () {
            var initiative = 0;

            if ($scope.character.charClass && $scope.character.level) {
                if ($scope.character.charClass.indexOf('Warrior') != -1) {

                    initiative += parseInt($scope.character.level, 10);
                }
            }

            if ($scope.character.agility) {
                initiative += $scope.character.agility.modifier;
            }

            //build text string
            var initiativeText;

            if (initiative >= 0) {
                initiativeText = "1d20 + ";
            }
            else {
                initiativeText = "1d20 ";
            }


            return $scope.character.initiative = initiativeText + initiative;

        };

        //Generate crit Table
        var generateCritTable = function () {
            if ($scope.character.charClass) {
                if ($scope.character.charClass.indexOf('Warrior') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critTable = Warrior.generateCritTable($scope.character.level);
                    }
                }
                if ($scope.character.charClass.indexOf('Thief') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critTable = Thief.generateCritTable();
                    }
                }
                if ($scope.character.charClass.indexOf('Cleric') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critTable = Cleric.generateCritTable();
                    }
                }
                if ($scope.character.charClass.indexOf('Wizard') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critTable = Wizard.generateCritTable();
                    }
                }
                if ($scope.character.charClass.indexOf('Dwarf') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critTable = Dwarf.generateCritTable();
                    }
                }
            }
            if ($scope.character.charClass.indexOf('Elf') != -1) {

                if ($scope.character.level) {

                    $scope.character.critTable = Elf.generateCritTable();
                }
            }
            if ($scope.character.charClass.indexOf('Halfling') != -1) {

                if ($scope.character.level) {

                    $scope.character.critTable = Halfling.generateCritTable();
                }
            }
        };

        //Generate crit Die
        var generateCritDie = function () {
            if ($scope.character.charClass) {
                if ($scope.character.charClass.indexOf('Warrior') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critDie = Warrior.critDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.charClass.indexOf('Thief') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critDie = Thief.critDie[$scope.character.level - 1];

                    }
                }
                if ($scope.character.charClass.indexOf('Cleric') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critDie = Cleric.critDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.charClass.indexOf('Wizard') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critDie = Wizard.critDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.charClass.indexOf('Dwarf') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critDie = Dwarf.critDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.charClass.indexOf('Elf') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critDie = Elf.critDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.charClass.indexOf('Halfling') != -1) {

                    if ($scope.character.level) {

                        $scope.character.critDie = Halfling.critDie[$scope.character.level - 1];

                    }
                }
            }
        };

        //Generate attack bonus
        var generateAttackBonus = function () {
            if ($scope.character.charClass) {
                if ($scope.character.charClass.indexOf('Warrior') != -1) {

                    if ($scope.character.level) {

                        $scope.character.attackBonus = Warrior.attackBonus[$scope.character.level - 1];


                    }
                }
                if ($scope.character.charClass.indexOf('Thief') != -1) {

                    if ($scope.character.level) {

                        $scope.character.attackBonus = Thief.attackBonus[$scope.character.level - 1];


                    }
                }

                if ($scope.character.charClass.indexOf('Cleric') != -1) {

                    if ($scope.character.level) {

                        $scope.character.attackBonus = Cleric.attackBonus[$scope.character.level - 1];


                    }
                }
                if ($scope.character.charClass.indexOf('Wizard') != -1) {

                    if ($scope.character.level) {

                        $scope.character.attackBonus = Wizard.attackBonus[$scope.character.level - 1];


                    }
                }
            }
            if ($scope.character.charClass.indexOf('Dwarf') != -1) {

                if ($scope.character.level) {

                    $scope.character.attackBonus = Dwarf.attackBonus[$scope.character.level - 1];


                }
            }
            if ($scope.character.charClass.indexOf('Elf') != -1) {

                if ($scope.character.level) {

                    $scope.character.attackBonus = Elf.attackBonus[$scope.character.level - 1];


                }
            }
            if ($scope.character.charClass.indexOf('Halfling') != -1) {

                if ($scope.character.level) {

                    $scope.character.attackBonus = Halfling.attackBonus[$scope.character.level - 1];

                }
            }
        };

        //Generate action die
        var generateActionDie = function () {
            if ($scope.character.charClass) {
                if ($scope.character.charClass.indexOf('Warrior') != -1) {

                    if ($scope.character.level) {

                        $scope.character.actionDie = Warrior.actionDie[$scope.character.level - 1];

                    }
                }
                if ($scope.character.charClass.indexOf('Thief') != -1) {

                    if ($scope.character.level) {

                        $scope.character.actionDie = Thief.actionDie[$scope.character.level - 1];

                    }
                }
                if ($scope.character.charClass.indexOf('Cleric') != -1) {

                    if ($scope.character.level) {

                        $scope.character.actionDie = Cleric.actionDie[$scope.character.level - 1];

                    }
                }
                if ($scope.character.charClass.indexOf('Wizard') != -1) {

                    if ($scope.character.level) {

                        $scope.character.actionDie = Wizard.actionDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.charClass.indexOf('Dwarf') != -1) {

                    if ($scope.character.level) {

                        $scope.character.actionDie = Dwarf.actionDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.charClass.indexOf('Elf') != -1) {

                    if ($scope.character.level) {

                        $scope.character.actionDie = Elf.actionDie[$scope.character.level - 1];


                    }
                }
                if ($scope.character.charClass.indexOf('Halfling') != -1) {

                    if ($scope.character.level) {

                        $scope.character.actionDie = Halfling.actionDie[$scope.character.level - 1];

                    }
                }
            }
        };

        //generate attack modifiers
        var generateAttackModifiers = function () {

            if ($scope.character.agility && $scope.character.strength) {

                $scope.character.missileAttackBonus = $scope.character.agility.modifier;
                $scope.character.meleeAttackBonus = $scope.character.strength.modifier;
                $scope.character.meleeDamageBonus = $scope.character.strength.modifier;

            }

        };

        //generate class specific things
        var generateClassSpecifics = function () {
            $scope.character.classSpecific = {};
            if ($scope.character.charClass) {
                if ($scope.character.charClass.indexOf('Warrior') != -1) {

                    if ($scope.character.level) {

                        $scope.character.classSpecific.threatRange = Warrior.threatRange[$scope.character.level - 1];

                    }
                }
                if ($scope.character.charClass.indexOf('Thief') != -1) {

                    if ($scope.character.level) {

                        $scope.character.classSpecific.luckyDie = Thief.luckyDie[$scope.character.level - 1];
                        if ($scope.character.agility) {

                            Thief.generateThiefSkills($scope.character.alignment, $scope.character.level, $scope.character.agility.modifier,
                                $scope.character.intelligence.modifier,
                                $scope.character.personality.modifier);

                            $scope.character.classSpecific.backstab = Thief.backstab;
                            $scope.character.classSpecific.sneakSilently = Thief.sneakSilently;
                            $scope.character.classSpecific.hideInShadows = Thief.hideInShadows;
                            $scope.character.classSpecific.pickPocket = Thief.pickPocket;
                            $scope.character.classSpecific.climbSheerSurfaces = Thief.climbSheerSurfaces;
                            $scope.character.classSpecific.pickLock = Thief.pickLock;
                            $scope.character.classSpecific.findTrap = Thief.findTrap;
                            $scope.character.classSpecific.disableTrap = Thief.disableTrap;
                            $scope.character.classSpecific.forgeDocument = Thief.forgeDocument;
                            $scope.character.classSpecific.disguiseSelf = Thief.disguiseSelf;
                            $scope.character.classSpecific.readLanguages = Thief.readLanguages;
                            $scope.character.classSpecific.handlePoison = Thief.handlePoison;
                            $scope.character.classSpecific.castSpellFromScroll = Thief.castSpellFromScroll;

                        }
                    }
                }
                if ($scope.character.charClass.indexOf('Cleric') != -1) {

                    if ($scope.character.level) {

                        if ($scope.character.personality) {
                            $scope.character.classSpecific.spellCheck = Cleric.getSpellCheck($scope.character.level, $scope.character.personality.modifier);
                            $scope.character.classSpecific.maximumSpellCastingLevel = Cleric.getMaximumSpellCastingLevel($scope.character.personality.score);
                            $scope.character.classSpecific.spellsKnown = Cleric.getSpellsKnown($scope.character.level);
                        }
                    }
                }
                if ($scope.character.charClass.indexOf('Wizard') != -1) {

                    if ($scope.character.level) {

                        if ($scope.character.intelligence) {
                            $scope.character.classSpecific.spellCheck = Wizard.getSpellCheck($scope.character.level, $scope.character.intelligence.modifier);
                            $scope.character.classSpecific.maximumSpellCastingLevel = Wizard.getMaximumSpellCastingLevel($scope.character.intelligence.score);
                            $scope.character.classSpecific.spellsKnown = Wizard.getNumberOfSpellsKnown($scope.character.level, $scope.character.intelligence.score);
                            $scope.character.classSpecific.currentSpellCastingLevel = Wizard.getCurrentCastingLevel($scope.character.level);

                            if ($scope.character.classSpecific.maximumSpellCastingLevel < $scope.character.classSpecific.currentSpellCastingLevel) {
                                $scope.character.classSpecific.currentSpellCastingLevel = $scope.character.classSpecific.maximumSpellCastingLevel;
                            }
                        }
                    }
                }
                if ($scope.character.charClass.indexOf('Elf') != -1) {

                    if ($scope.character.level) {

                        if ($scope.character.intelligence) {
                            $scope.character.classSpecific.spellCheck = Elf.getSpellCheck($scope.character.level, $scope.character.intelligence.modifier);
                            $scope.character.classSpecific.maximumSpellCastingLevel = Elf.getMaximumSpellCastingLevel($scope.character.intelligence.score);
                            $scope.character.classSpecific.spellsKnown = Elf.getNumberOfSpellsKnown($scope.character.level);
                            $scope.character.classSpecific.currentSpellCastingLevel = Elf.getCurrentCastingLevel($scope.character.level);

                            if ($scope.character.classSpecific.maximumSpellCastingLevel < $scope.character.classSpecific.currentSpellCastingLevel) {
                                $scope.character.classSpecific.currentSpellCastingLevel = $scope.character.classSpecific.maximumSpellCastingLevel;
                            }
                        }
                    }
                }
                if ($scope.character.charClass.indexOf('Halfling') != -1) {

                    if ($scope.character.level) {

                        $scope.character.classSpecific.stealth = Halfling.getStealth($scope.character.level);
                    }
                }
            }
        };

    }
]);