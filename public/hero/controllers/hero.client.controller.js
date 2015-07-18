/**
 * Created by chris on 6/26/15.
 */
angular.module('hero').controller('HeroController', ['$scope',
    '$routeParams', '$location', 'Authentication', 'Hero',
    function ($scope, $routeParams, $location, Authentication, Hero) {
        $scope.authentication = Authentication;
        $scope.hero = {};
        $scope.blockEdit = true;
        $scope.hero.ownedWeapons = [{}];
        $scope.hero.ownedArmor = [{}];


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

        //Equipment
        $scope.equipment =[
            {name:"Backpack", cost:200},
            {name:"Candle", cost: 1},
            {name:"Chain, 10'", cost: 3000},
            {name:"Chalk, 1 piece", cost: 1},
            {name:"Chest, empty", cost: 200},
            {name:"Crowbar", cost: 200},
            {name:"Flask,empty", cost: 3},
            {name:"Flint & steel", cost: 15},
            {name:"Grappling hook", cost: 100},
            {name:"Hammer, small", cost: 50},
            {name:"Holy symbol", cost: 2500},
            {name:"Holy water, 1 vial", cost: 2500},
            {name:"Iron spike", cost: 10},
            {name:"Lantern", cost: 1000},
            {name:"Mirror, hand-sized", cost: 1000},
            {name:"Oil, 1 flask", cost: 20},
            {name:"Pole, 10-foot", cost: 15},
            {name:"Rations, per day", cost: 5},
            {name:"Rope, 50'", cost: 25},
            {name:"Sack, large", cost: 12},
            {name:"Sack, small", cost: 8},
            {name:"Thieves' tools", cost: 2500},
            {name:"Torch", cost: 1},
            {name:"Waterskin", cost: 50}
        ];

        //weapons
        $scope.weapons = [
          {name:"Battleaxe", damage:"1d10", range:"-", cost:700},
          {name:"BlackJack", damage:"1d3/2d6", range:"-", cost:300},
          {name:"Blowgun", damage:"1d3/1d5", range:"20/40/60", cost:600},
          {name:"Club", damage:"1d4", range:"-", cost:300},
          {name:"Crossbow", damage:"1d6", range:"80/160/240", cost:3000},
          {name:"Dagger", damage:"1d4/1d10", range:"10/20/30", cost:300},
          {name:"Dart", damage:"1d4", range:"20/40/60", cost:50},
          {name:"Flail", damage:"1d6", range:"-", cost:600},
          {name:"Garrote", damage:"1/3d4", range:"-", cost:200},
          {name:"Handaxe", damage:"1d6", range:"10/20/30", cost:400},
          {name:"Javelin", damage:"1d6", range:"30/60/90", cost:100},
          {name:"Lance", damage:"1d12", range:"-", cost:2500},
          {name:"Longbow", damage:"1d6", range:"70/140/210", cost:4000},
          {name:"Longsword", damage:"1d8", range:"-", cost:1000},
          {name:"Mace", damage:"1d6", range:"-", cost:500},
          {name:"Polearm", damage:"1d10", range:"-", cost:700},
          {name:"Shortbow", damage:"1d6", range:"50/100/150", cost:2500},
          {name:"Short sword", damage:"1d6", range:"-", cost:700},
          {name:"Sling", damage:"1d4", range:"40/80/160", cost:200},
          {name:"Spear", damage:"1d8", range:"-", cost:300},
          {name:"Staff", damage:"1d4", range:"-", cost:50},
          {name:"Two-handed sword", damage:"1d10", range:"-", cost:1500},
          {name:"Warhammer", damage:"1d8", range:"-", cost:500}
        ];

        //armor
        $scope.armor = [{name:"Unarmored", acbonus:0, penalty:0, speeed:0, fumble:"d4", cost:0},
            {name:"Padded", acbonus:1, penalty:0, speed:0, fumble:"d8", cost:500},
            {name:"Leather", acbonus:2, penalty:-1, speed:0, fumble:"d8", cost:2000},
            {name:"Studded Leather", acbonus:3, penalty:-2, speed:0, fumble:"d8", cost:4500},
            {name:"Hide", acbonus:3, penalty:-3, speed:0, fumble:"d12", cost:3000},
            {name:"Scale mail", acbonus:4, penalty:-4, speed:-5, fumble:"d12", cost:8000},
            {name:"Chainmail", acbonus:5, penalty:-5, speed:-5, fumble:"d12", cost:15000},
            {name:"Banded mail", acbonus:6, penalty:-6, speed:-5, fumble:"d16", cost:25000},
            {name:"Half-plate", acbonus:7, penalty:-7, speed:-10, fumble:"d16", cost:55000},
            {name:"Full Plate", acbonus:8, penalty:-8, speed:-10, fumble:"d16", cost:120000},
            {name:"Shield", acbonus:1, penalty:-1, speed:0, fumble:"", cost:1000}
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
            $scope.hero.strength = abilityModifiers[randomizer(0, 15)];
            $scope.hero.agility = abilityModifiers[randomizer(0, 15)];
            $scope.hero.stamina = abilityModifiers[randomizer(0, 15)];
            $scope.hero.personality = abilityModifiers[randomizer(0, 15)];
            $scope.hero.luck = abilityModifiers[randomizer(0, 15)];
            $scope.hero.intelligence = abilityModifiers[randomizer(0, 15)];
            $scope.hero.luckyRoll = luckyRoll[randomizer(0, 29)];

        };

        var createhero = function () {
            randomStats();

        };


        $scope.create = function () {
            $scope.hero.level = this.level;
            $scope.hero.charClass = this.charClass;
            $scope.hero.alignment = this.alignment;
            $scope.hero.characterName = this.characterName;

            createhero();
            $scope.generateTitle();
            generateSavingThrowModifiers();
            randomOccupation();
            generateheroSpeed();
            generateInitiativeRoll();
            generateCritTable();
            generateAttackBonus();
            generateCritDie();
            generateActionDie();
            generateAttackModifiers();
            generateClassSpecifics();
            generateHitPoints();

            var hero = new Hero({
                characterName: $scope.characterName,
                level: $scope.hero.level,
                charClass: $scope.hero.charClass,
                charAbilities: $scope.hero,
                alignment: $scope.hero.alignment,
                title: $scope.hero.title,
                occupation: $scope.hero.occupation,
                speed: $scope.hero.speed,
                initiative: $scope.hero.initiative,
                critTable: $scope.hero.critTable,
                critDie: $scope.hero.critDie,
                attackBonus: $scope.hero.attackBonus,
                actionDie: $scope.hero.actionDie,
                meleeBonus: $scope.hero.meleeBonus,
                missileBonus: $scope.hero.missileBonus,
                classSpecific: $scope.hero.classSpecific,
                hitPoints: $scope.hero.hitPoints,
                strength: $scope.hero.strength,
                agility: $scope.hero.agility,
                stamina: $scope.hero.stamina,
                personality: $scope.hero.personality,
                luck: $scope.hero.luck,
                intelligence: $scope.hero.intelligence,
                luckyRoll: $scope.hero.luckyRoll,
                reflexSave: $scope.hero.reflexSave,
                willPowerSave: $scope.hero.willPowerSave,
                fortitudeSave: $scope.hero.fortitudeSave,
                equipment: $scope.hero.equipment,
                ownedWeapons: $scope.hero.ownedWeapons,
                ownedArmor: $scope.ownedArmor,
                treasure: $scope.hero.treasure

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
            $scope.blockEdit = true;
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

        $scope.edit = function () {
            $scope.blockEdit = false;

        }

        $scope.cancel = function () {
            $scope.blockEdit = true;
            $scope.findOne();

        }


        //Generate title
        $scope.generateTitle = function () {
            if ($scope.hero.charClass) {

                if ($scope.hero.charClass.indexOf('Warrior') != -1) {

                    if ($scope.hero.level && $scope.hero.alignment) {

                        $scope.hero.title = Warrior.getWarriorTitle($scope.hero.alignment, $scope.hero.level);
                    }
                }
                if ($scope.hero.charClass.indexOf('Thief') != -1) {

                    if ($scope.hero.level && $scope.hero.alignment) {

                        $scope.hero.title = Thief.getThiefTitle($scope.hero.alignment, $scope.hero.level);
                        generateClassSpecifics();
                    }
                }
                if ($scope.hero.charClass.indexOf('Cleric') != -1) {

                    if ($scope.hero.level && $scope.hero.alignment) {

                        $scope.hero.title = Cleric.getClericTitle($scope.hero.alignment, $scope.hero.level);
                    }
                }
                if ($scope.hero.charClass.indexOf('Wizard') != -1) {

                    if ($scope.hero.level && $scope.hero.alignment) {

                        $scope.hero.title = Wizard.getWizardTitle($scope.hero.alignment, $scope.hero.level);
                    }
                }
                if ($scope.hero.charClass.indexOf('Dwarf') != -1) {

                    if ($scope.hero.level && $scope.hero.alignment) {

                        $scope.hero.title = Dwarf.getDwarfTitle($scope.hero.alignment, $scope.hero.level);
                    }
                }
                if ($scope.hero.charClass.indexOf('Elf') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.title = Elf.getElfTitle($scope.hero.level);
                    }
                }
                if ($scope.hero.charClass.indexOf('Halfling') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.title = Halfling.getHalflingTitle($scope.hero.level);
                    }
                }
            }
        };

        //generate saving throw modifiers
        var generateSavingThrowModifiers = function () {
            if ($scope.hero.charClass) {
                if ($scope.hero.charClass.indexOf('Warrior') != -1) {

                    if ($scope.hero.level && $scope.hero.personality) {

                        $scope.hero.willPowerSave = $scope.hero.personality.modifier + Warrior.willPowerBonus[$scope.hero.level - 1];
                        $scope.hero.fortitudeSave = $scope.hero.stamina.modifier + Warrior.fortitudeBonus[$scope.hero.level - 1];
                        $scope.hero.reflexSave = $scope.hero.agility.modifier + Warrior.reflexBonus[$scope.hero.level - 1];

                    }
                }
                if ($scope.hero.charClass.indexOf('Thief') != -1) {

                    if ($scope.hero.level && $scope.hero.personality) {

                        $scope.hero.willPowerSave = $scope.hero.personality.modifier + Thief.willPowerBonus[$scope.hero.level - 1];
                        $scope.hero.fortitudeSave = $scope.hero.stamina.modifier + Thief.fortitudeBonus[$scope.hero.level - 1];
                        $scope.hero.reflexSave = $scope.hero.agility.modifier + Thief.reflexBonus[$scope.hero.level - 1];

                    }
                }
                if ($scope.hero.charClass.indexOf('Cleric') != -1) {

                    if ($scope.hero.level && $scope.hero.personality) {

                        $scope.hero.willPowerSave = $scope.hero.personality.modifier + Cleric.willPowerBonus[$scope.hero.level - 1];
                        $scope.hero.fortitudeSave = $scope.hero.stamina.modifier + Cleric.fortitudeBonus[$scope.hero.level - 1];
                        $scope.hero.reflexSave = $scope.hero.agility.modifier + Cleric.reflexBonus[$scope.hero.level - 1];

                    }
                }
                if ($scope.hero.charClass.indexOf('Wizard') != -1) {

                    if ($scope.hero.level && $scope.hero.personality) {

                        $scope.hero.willPowerSave = $scope.hero.personality.modifier + Wizard.willPowerBonus[$scope.hero.level - 1];
                        $scope.hero.fortitudeSave = $scope.hero.stamina.modifier + Wizard.fortitudeBonus[$scope.hero.level - 1];
                        $scope.hero.reflexSave = $scope.hero.agility.modifier + Wizard.reflexBonus[$scope.hero.level - 1];

                    }
                }
                if ($scope.hero.charClass.indexOf('Dwarf') != -1) {

                    if ($scope.hero.level && $scope.hero.personality) {

                        $scope.hero.willPowerSave = $scope.hero.personality.modifier + Dwarf.willPowerBonus[$scope.hero.level - 1];
                        $scope.hero.fortitudeSave = $scope.hero.stamina.modifier + Dwarf.fortitudeBonus[$scope.hero.level - 1];
                        $scope.hero.reflexSave = $scope.hero.agility.modifier + Dwarf.reflexBonus[$scope.hero.level - 1];

                    }
                }
                if ($scope.hero.charClass.indexOf('Elf') != -1) {

                    if ($scope.hero.level && $scope.hero.personality) {

                        $scope.hero.willPowerSave = $scope.hero.personality.modifier + Elf.willPowerBonus[$scope.hero.level - 1];
                        $scope.hero.fortitudeSave = $scope.hero.stamina.modifier + Elf.fortitudeBonus[$scope.hero.level - 1];
                        $scope.hero.reflexSave = $scope.hero.agility.modifier + Elf.reflexBonus[$scope.hero.level - 1];

                    }
                }
                if ($scope.hero.charClass.indexOf('Halfling') != -1) {

                    if ($scope.hero.level && $scope.hero.personality) {

                        $scope.hero.willPowerSave = $scope.hero.personality.modifier + Halfling.willPowerBonus[$scope.hero.level - 1];
                        $scope.hero.fortitudeSave = $scope.hero.stamina.modifier + Halfling.fortitudeBonus[$scope.hero.level - 1];
                        $scope.hero.reflexSave = $scope.hero.agility.modifier + Halfling.reflexBonus[$scope.hero.level - 1];

                    }
                }
            }
        };


        //Generates random occupation
        var randomOccupation = function () {
            if ($scope.hero.charClass.indexOf('Dwarf') != -1) {
                var randomOccResult = randomizer(0, 7);
                $scope.hero.occupation = dwarfOccupation[randomOccResult];
            } else if ($scope.hero.charClass.indexOf('Elf') != -1) {
                var randomOccResult = randomizer(0, 7);
                $scope.hero.occupation = elfOccupation[randomOccResult];
            } else if ($scope.hero.charClass.indexOf('Halfling') != -1) {
                var randomOccResult = randomizer(0, 8);
                $scope.hero.occupation = halflingOccupation[randomOccResult];
            } else {
                var randomOccResult = randomizer(0, 53);
                $scope.hero.occupation = humanOccupation[randomOccResult];
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

        var generateheroSpeed = function () {
            if ($scope.hero.charClass.indexOf('Dwarf') != -1) {
                $scope.hero.speed = 20;

            } else if ($scope.hero.charClass.indexOf('Elf') != -1) {
                $scope.hero.speed = 30;

            } else if ($scope.hero.charClass.indexOf('Halfling') != -1) {
                $scope.hero.speed = 20;

            } else {
                $scope.hero.speed = 30;
            }
        };

        //Generate the initiative roll
        var generateInitiativeRoll = function () {
            var initiative = 0;

            if ($scope.hero.charClass && $scope.hero.level) {
                if ($scope.hero.charClass.indexOf('Warrior') != -1) {

                    initiative += parseInt($scope.hero.level, 10);
                }
            }

            if ($scope.hero.agility) {
                initiative += $scope.hero.agility.modifier;
            }

            //build text string
            var initiativeText;

            if (initiative >= 0) {
                initiativeText = "1d20 + ";
            }
            else {
                initiativeText = "1d20 ";
            }


            return $scope.hero.initiative = initiativeText + initiative;

        };

        //Generate crit Table
        var generateCritTable = function () {
            if ($scope.hero.charClass) {
                if ($scope.hero.charClass.indexOf('Warrior') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.critTable = Warrior.generateCritTable($scope.hero.level);
                    }
                }
                if ($scope.hero.charClass.indexOf('Thief') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.critTable = Thief.generateCritTable();
                    }
                }
                if ($scope.hero.charClass.indexOf('Cleric') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.critTable = Cleric.generateCritTable();
                    }
                }
                if ($scope.hero.charClass.indexOf('Wizard') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.critTable = Wizard.generateCritTable();
                    }
                }
                if ($scope.hero.charClass.indexOf('Dwarf') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.critTable = Dwarf.generateCritTable();
                    }
                }
            }
            if ($scope.hero.charClass.indexOf('Elf') != -1) {

                if ($scope.hero.level) {

                    $scope.hero.critTable = Elf.generateCritTable();
                }
            }
            if ($scope.hero.charClass.indexOf('Halfling') != -1) {

                if ($scope.hero.level) {

                    $scope.hero.critTable = Halfling.generateCritTable();
                }
            }
        };

        //Generate crit Die
        var generateCritDie = function () {
            if ($scope.hero.charClass) {
                if ($scope.hero.charClass.indexOf('Warrior') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.critDie = Warrior.critDie[$scope.hero.level - 1];


                    }
                }
                if ($scope.hero.charClass.indexOf('Thief') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.critDie = Thief.critDie[$scope.hero.level - 1];

                    }
                }
                if ($scope.hero.charClass.indexOf('Cleric') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.critDie = Cleric.critDie[$scope.hero.level - 1];


                    }
                }
                if ($scope.hero.charClass.indexOf('Wizard') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.critDie = Wizard.critDie[$scope.hero.level - 1];


                    }
                }
                if ($scope.hero.charClass.indexOf('Dwarf') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.critDie = Dwarf.critDie[$scope.hero.level - 1];


                    }
                }
                if ($scope.hero.charClass.indexOf('Elf') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.critDie = Elf.critDie[$scope.hero.level - 1];


                    }
                }
                if ($scope.hero.charClass.indexOf('Halfling') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.critDie = Halfling.critDie[$scope.hero.level - 1];

                    }
                }
            }
        };

        //Generate attack bonus
        var generateAttackBonus = function () {
            if ($scope.hero.charClass) {
                if ($scope.hero.charClass.indexOf('Warrior') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.attackBonus = Warrior.attackBonus[$scope.hero.level - 1];


                    }
                }
                if ($scope.hero.charClass.indexOf('Thief') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.attackBonus = Thief.attackBonus[$scope.hero.level - 1];


                    }
                }

                if ($scope.hero.charClass.indexOf('Cleric') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.attackBonus = Cleric.attackBonus[$scope.hero.level - 1];


                    }
                }
                if ($scope.hero.charClass.indexOf('Wizard') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.attackBonus = Wizard.attackBonus[$scope.hero.level - 1];


                    }
                }
            }
            if ($scope.hero.charClass.indexOf('Dwarf') != -1) {

                if ($scope.hero.level) {

                    $scope.hero.attackBonus = Dwarf.attackBonus[$scope.hero.level - 1];


                }
            }
            if ($scope.hero.charClass.indexOf('Elf') != -1) {

                if ($scope.hero.level) {

                    $scope.hero.attackBonus = Elf.attackBonus[$scope.hero.level - 1];


                }
            }
            if ($scope.hero.charClass.indexOf('Halfling') != -1) {

                if ($scope.hero.level) {

                    $scope.hero.attackBonus = Halfling.attackBonus[$scope.hero.level - 1];

                }
            }
        };

        //Generate action die
        var generateActionDie = function () {
            if ($scope.hero.charClass) {
                if ($scope.hero.charClass.indexOf('Warrior') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.actionDie = Warrior.actionDie[$scope.hero.level - 1];

                    }
                }
                if ($scope.hero.charClass.indexOf('Thief') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.actionDie = Thief.actionDie[$scope.hero.level - 1];

                    }
                }
                if ($scope.hero.charClass.indexOf('Cleric') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.actionDie = Cleric.actionDie[$scope.hero.level - 1];

                    }
                }
                if ($scope.hero.charClass.indexOf('Wizard') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.actionDie = Wizard.actionDie[$scope.hero.level - 1];


                    }
                }
                if ($scope.hero.charClass.indexOf('Dwarf') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.actionDie = Dwarf.actionDie[$scope.hero.level - 1];


                    }
                }
                if ($scope.hero.charClass.indexOf('Elf') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.actionDie = Elf.actionDie[$scope.hero.level - 1];


                    }
                }
                if ($scope.hero.charClass.indexOf('Halfling') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.actionDie = Halfling.actionDie[$scope.hero.level - 1];

                    }
                }
            }
        };

        //generate attack modifiers
        var generateAttackModifiers = function () {

            if ($scope.hero.agility && $scope.hero.strength) {

                $scope.hero.missileBonus = $scope.hero.agility.modifier;
                $scope.hero.meleeBonus = $scope.hero.strength.modifier;
            }

        };

        //generate class specific things
        var generateClassSpecifics = function () {
            $scope.hero.classSpecific = {};
            if ($scope.hero.charClass) {
                if ($scope.hero.charClass.indexOf('Warrior') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.classSpecific.threatRange = Warrior.threatRange[$scope.hero.level - 1];

                    }
                }
                if ($scope.hero.charClass.indexOf('Thief') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.classSpecific.luckyDie = Thief.luckyDie[$scope.hero.level - 1];
                        if ($scope.hero.agility) {

                            Thief.generateThiefSkills($scope.hero.alignment, $scope.hero.level, $scope.hero.agility.modifier,
                                $scope.hero.intelligence.modifier,
                                $scope.hero.personality.modifier);

                            $scope.hero.classSpecific.backstab = Thief.backstab;
                            $scope.hero.classSpecific.sneakSilently = Thief.sneakSilently;
                            $scope.hero.classSpecific.hideInShadows = Thief.hideInShadows;
                            $scope.hero.classSpecific.pickPocket = Thief.pickPocket;
                            $scope.hero.classSpecific.climbSheerSurfaces = Thief.climbSheerSurfaces;
                            $scope.hero.classSpecific.pickLock = Thief.pickLock;
                            $scope.hero.classSpecific.findTrap = Thief.findTrap;
                            $scope.hero.classSpecific.disableTrap = Thief.disableTrap;
                            $scope.hero.classSpecific.forgeDocument = Thief.forgeDocument;
                            $scope.hero.classSpecific.disguiseSelf = Thief.disguiseSelf;
                            $scope.hero.classSpecific.readLanguages = Thief.readLanguages;
                            $scope.hero.classSpecific.handlePoison = Thief.handlePoison;
                            $scope.hero.classSpecific.castSpellFromScroll = Thief.castSpellFromScroll;

                        }
                    }
                }
                if ($scope.hero.charClass.indexOf('Cleric') != -1) {

                    if ($scope.hero.level) {

                        if ($scope.hero.personality) {
                            $scope.hero.classSpecific.spellCheck = Cleric.getSpellCheck($scope.hero.level, $scope.hero.personality.modifier);
                            $scope.hero.classSpecific.maximumSpellCastingLevel = Cleric.getMaximumSpellCastingLevel($scope.hero.personality.score);
                            $scope.hero.classSpecific.spellsKnown = Cleric.getSpellsKnown($scope.hero.level);
                        }
                    }
                }
                if ($scope.hero.charClass.indexOf('Wizard') != -1) {

                    if ($scope.hero.level) {

                        if ($scope.hero.intelligence) {
                            $scope.hero.classSpecific.spellCheck = Wizard.getSpellCheck($scope.hero.level, $scope.hero.intelligence.modifier);
                            $scope.hero.classSpecific.maximumSpellCastingLevel = Wizard.getMaximumSpellCastingLevel($scope.hero.intelligence.score);
                            $scope.hero.classSpecific.spellsKnown = Wizard.getNumberOfSpellsKnown($scope.hero.level, $scope.hero.intelligence.score);
                            $scope.hero.classSpecific.currentSpellCastingLevel = Wizard.getCurrentCastingLevel($scope.hero.level);

                            if ($scope.hero.classSpecific.maximumSpellCastingLevel < $scope.hero.classSpecific.currentSpellCastingLevel) {
                                $scope.hero.classSpecific.currentSpellCastingLevel = $scope.hero.classSpecific.maximumSpellCastingLevel;
                            }
                        }
                    }
                }
                if ($scope.hero.charClass.indexOf('Elf') != -1) {

                    if ($scope.hero.level) {

                        if ($scope.hero.intelligence) {
                            $scope.hero.classSpecific.spellCheck = Elf.getSpellCheck($scope.hero.level, $scope.hero.intelligence.modifier);
                            $scope.hero.classSpecific.maximumSpellCastingLevel = Elf.getMaximumSpellCastingLevel($scope.hero.intelligence.score);
                            $scope.hero.classSpecific.spellsKnown = Elf.getNumberOfSpellsKnown($scope.hero.level);
                            $scope.hero.classSpecific.currentSpellCastingLevel = Elf.getCurrentCastingLevel($scope.hero.level);

                            if ($scope.hero.classSpecific.maximumSpellCastingLevel < $scope.hero.classSpecific.currentSpellCastingLevel) {
                                $scope.hero.classSpecific.currentSpellCastingLevel = $scope.hero.classSpecific.maximumSpellCastingLevel;
                            }
                        }
                    }
                }
                if ($scope.hero.charClass.indexOf('Halfling') != -1) {

                    if ($scope.hero.level) {

                        $scope.hero.classSpecific.stealth = Halfling.getStealth($scope.hero.level);
                    }
                }
            }
        };

        //generate the hit points for the hero
        var generateHitPoints = function () {
            $scope.hero.hitPoints = 0;
            var initialHitPoints = 0;
            var result;
            var test = [];
            var i = 0;

            if ($scope.hero.charClass) {
                if ($scope.hero.charClass.indexOf('Warrior') != -1) {

                    if ($scope.hero.level && $scope.hero.stamina) {
                        initialHitPoints = randomizer(1, 4) + $scope.hero.stamina.modifier; //set initial level 0 hp rol
                        if (initialHitPoints < 1) {
                            initialHitPoints = 1;
                        }


                        while (i < $scope.hero.level) {

                            result = randomizer(1, Warrior.hitPointDie) + $scope.hero.stamina.modifier;
                            if (result < 1) {
                                result = 1;
                            }
                            test.push(result);
                            $scope.hero.hitPoints += result;
                            i++;
                        }
                        $scope.hero.hitPoints += initialHitPoints;
                    }

                }
                if ($scope.hero.charClass.indexOf('Thief') != -1) {

                    if ($scope.hero.level && $scope.hero.stamina) {
                        initialHitPoints = randomizer(1, 4) + $scope.hero.stamina.modifier; //set initial level 0 hp rol
                        if (initialHitPoints < 1) {
                            initialHitPoints = 1;
                        }
                        while (i < $scope.hero.level) {

                            result = randomizer(1, Thief.hitPointDie) + $scope.hero.stamina.modifier;
                            if (result < 1) {
                                result = 1;
                            }
                            test.push(result);
                            $scope.hero.hitPoints += result;
                            i++;
                        }
                        $scope.hero.hitPoints += initialHitPoints;

                    }

                }

                if ($scope.hero.charClass.indexOf('Cleric') != -1) {

                    if ($scope.hero.level && $scope.hero.stamina) {
                        initialHitPoints = randomizer(1, 4) + $scope.hero.stamina.modifier; //set initial level 0 hp rol
                        if (initialHitPoints < 1) {
                            initialHitPoints = 1;
                        }

                        while (i < $scope.hero.level) {

                            result = randomizer(1, Cleric.hitPointDie) + $scope.hero.stamina.modifier;
                            if (result < 1) {
                                result = 1;
                            }
                            test.push(result);
                            $scope.hero.hitPoints += result;
                            i++;
                        }
                        $scope.hero.hitPoints += initialHitPoints;

                    }

                }
                if ($scope.hero.charClass.indexOf('Wizard') != -1) {

                    if ($scope.hero.level && $scope.hero.stamina) {
                        initialHitPoints = randomizer(1, 4) + $scope.hero.stamina.modifier; //set initial level 0 hp rol
                        if (initialHitPoints < 1) {
                            initialHitPoints = 1;
                        }

                        while (i < $scope.hero.level) {

                            result = randomizer(1, Wizard.hitPointDie) + $scope.hero.stamina.modifier;
                            if (result < 1) {
                                result = 1;
                            }
                            test.push(result);
                            $scope.hero.hitPoints += result;
                            i++;
                        }
                        $scope.hero.hitPoints += initialHitPoints;

                    }

                }
                if ($scope.hero.charClass.indexOf('Dwarven') != -1) {

                    if ($scope.hero.level && $scope.hero.stamina) {
                        initialHitPoints = randomizer(1, 4) + $scope.hero.stamina.modifier; //set initial level 0 hp rol
                        if (initialHitPoints < 1) {
                            initialHitPoints = 1;
                        }

                        while (i < $scope.hero.level) {

                            result = randomizer(1, Dwarf.hitPointDie) + $scope.hero.stamina.modifier;
                            if (result < 1) {
                                result = 1;
                            }
                            test.push(result);
                            $scope.hero.hitPoints += result;
                            i++;
                        }
                        $scope.hero.hitPoints += initialHitPoints;

                    }
                }
                if ($scope.hero.charClass.indexOf('Elven') != -1) {

                    if ($scope.hero.level && $scope.hero.stamina) {
                        initialHitPoints = randomizer(1, 4) + $scope.hero.stamina.modifier; //set initial level 0 hp rol
                        if (initialHitPoints < 1) {
                            initialHitPoints = 1;
                        }

                        while (i < $scope.hero.level) {

                            result = randomizer(1, Elf.hitPointDie) + $scope.hero.stamina.modifier;
                            if (result < 1) {
                                result = 1;
                            }
                            test.push(result);
                            $scope.hero.hitPoints += result;
                            i++;
                        }
                        $scope.hero.hitPoints += initialHitPoints;

                    }
                }
                if ($scope.hero.charClass.indexOf('Halfling') != -1) {

                    if ($scope.hero.level && $scope.hero.stamina) {
                        initialHitPoints = randomizer(1, 4) + $scope.hero.stamina.modifier; //set initial level 0 hp rol
                        if (initialHitPoints < 1) {
                            initialHitPoints = 1;
                        }

                        while (i < $scope.hero.level) {

                            result = randomizer(1, Halfling.hitPointDie) + $scope.hero.stamina.modifier;
                            if (result < 1) {
                                result = 1;
                            }
                            test.push(result);
                            $scope.hero.hitPoints += result;
                            i++;
                        }
                        $scope.hero.hitPoints += initialHitPoints;

                    }
                }
                console.log("Hit points rolled was: " + test + ", initialHitPoints: " + initialHitPoints);

            }
        };


        //Call methods affected by level changes
        $scope.generateLevelChanges = function () {
            generateInitiativeRoll();
            $scope.generateTitle();
            generateCritTable();
            generateAttackBonus();
            generateActionDie();
            generateSavingThrowModifiers();
            generateClassSpecifics();
            generateHitPoints();
            generateCritDie();
        };

        //Call when a strength stat is updated
        $scope.updateStrengthStats = function (newScore) {
            if (newScore >= 3) {
                $scope.hero.strength = abilityModifiers[newScore - 3];
                generateAttackModifiers();
            }
        };

        //Call when a agility stat is updated
        $scope.updateAgilityStats = function (newScore) {
            if (newScore >= 3) {
                $scope.hero.agility = abilityModifiers[newScore - 3];
                generateAttackModifiers();
                generateSavingThrowModifiers();
                generateInitiativeRoll();
                if ($scope.hero.charClass.indexOf('Thief') != -1) {
                    generateClassSpecifics();
                }

            }
        };

        //Call when a stamina stat is updated
        $scope.updateStaminaStats = function (newScore) {
            if (newScore >= 3) {
                $scope.hero.stamina = abilityModifiers[newScore - 3];
                generateSavingThrowModifiers();

            }
        };

        //Call when a personality stat is updated
        $scope.updatePersonalityStats = function (newScore) {
            if (newScore >= 3) {
                $scope.hero.personality = abilityModifiers[newScore - 3];
                generateSavingThrowModifiers();

                if ($scope.hero.charClass.indexOf('Cleric') != -1 || $scope.hero.charClass.indexOf('Thief') != -1) {
                    generateClassSpecifics();
                }
            }
        };

        //Call when a luck stat is updated
        $scope.updateLuckStats = function (newScore) {
            if (newScore >= 3) {
                $scope.hero.luck = abilityModifiers[newScore - 3];
            }
        };

        //Call when a intelligence stat is updated
        $scope.updateIntelligenceStats = function (newScore) {
            if (newScore >= 3) {
                $scope.hero.intelligence = abilityModifiers[newScore - 3];

                if ($scope.hero.charClass.indexOf('Wizard') != -1 || $scope.hero.charClass.indexOf('Thief') != -1 || $scope.hero.charClass.indexOf('Elf') != -1) {
                    generateClassSpecifics();
                }
            }
        };

        $scope.addEquipment = function()
        {
            var equipmentPiece = $scope.equipmentList.name + "\n";

            if(document.getElementById("equipmentArea").value == '') {
                $scope.hero.equipment = equipmentPiece;
            } else{

                $scope.hero.equipment += equipmentPiece;

            }

        };



        $scope.addWeapon = function()
        {
            var selectedWeapon = $scope.weaponList;
            $scope.hero.ownedWeapons.push(selectedWeapon);
        };

        $scope.addArmor = function()
        {
            var selectedArmor = $scope.armorList;
            $scope.hero.ownedArmor.push(selectedArmor);
        };

    }
]);