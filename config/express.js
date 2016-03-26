// Invoke 'strict' JavaScript mode
'use strict';

// Load the module dependencies
var config = require('./config'),
    express = require('express'),
    morgan = require('morgan'),
    compress = require('compression'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    flash = require('connect-flash'),
    pdfFiller = require('pdffiller'),
    path = require('path'),
    passport = require('passport');

// Define the Express configuration method
module.exports = function () {
    // Create a new Express application instance
    var app = express();

    // Use the 'NDOE_ENV' variable to activate the 'morgan' logger or 'compress' middleware
    if (process.env.NODE_ENV === 'development') {
        app.use(morgan('dev'));
    } else if (process.env.NODE_ENV === 'production') {
        app.use(compress());
    }

    // Use the 'body-parser' and 'method-override' middleware functions
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Configure the 'session' middleware
    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: config.sessionSecret
    }));

    // Set the application view engine and 'views' folder
    app.set('views', './app/views');
    app.set('view engine', 'ejs');

    // Configure the flash messages middleware
    app.use(flash());

    // Configure the Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());


    // Load the routing files
    require('../app/routes/index.server.routes.js')(app);
    require('../app/routes/users.server.routes.js')(app);
    require('../app/routes/hero.server.routes.js')(app);

    // Configure static file serving
    app.use(express.static('./public'));

    app.post('/pdf', function (req, res) {
        //find and return a hero using the id
        var characterSheet = req.body.charClass;
        var sheetName = noSpace(req.body.characterName) + '_the_' + noSpace(req.body.title);

        var sourcePDF = "./public/assets/" + characterSheet + "Sheet.pdf";
        var destinationPDF = "./public/assets/" + sheetName + ".pdf";

        var armor = "";
        var armorIterator = 0;
        while (armorIterator < req.body.ownedArmor.length) {
            armor += req.body.ownedArmor[armorIterator].name
                + ", " + req.body.ownedArmor[armorIterator].acbonus
                + ", " + req.body.ownedArmor[armorIterator].penalty
                + ", " + req.body.ownedArmor[armorIterator].speed
                + ", " + req.body.ownedArmor[armorIterator].fumble
                + "\n"
            armorIterator++;
        }

        var weapon = "";
        var weaponIterator = 0;
        while (weaponIterator < req.body.ownedWeapons.length) {
            weapon += req.body.ownedWeapons[weaponIterator].name
                + ", " + req.body.ownedWeapons[weaponIterator].damage
                + ", " + req.body.ownedWeapons[weaponIterator].range
                + "\n"
            weaponIterator++;
        }

        var xp = req.body.xp ? req.body.xp : "";
        var treasure = req.body.treasure ? req.body.treasure : "";
        var equipment = req.body.equipment ? req.body.equipment : "";
        var notes = req.body.notes ? req.body.notes : "";


        var data = {
            "characterName": req.body.characterName,
            "level": req.body.level,
            "charClass": req.body.charClass,
            //"charAbilities": $scope.hero,
            "alignment": req.body.alignment,
            "title": req.body.title,
            "occupation": req.body.occupation.occupation,
            "speed": req.body.speed,
            "initiative": req.body.initiative,
            "critTable": req.body.critTable,
            "critDie": req.body.critDie,
            "attackBonus": req.body.attackBonus,
            "actionDie": req.body.actionDie,
            "meleeBonus": req.body.meleeBonus,
            "missileBonus": req.body.missileBonus,
            "classSpecific": req.body.classSpecific,
            "hitPoints": req.body.hitPoints,
            "strengthScore": req.body.strength.score,
            "strengthModifier": req.body.strength.modifier,
            "agilityScore": req.body.agility.score,
            "agilityModifier": req.body.agility.modifier,
            "staminaScore": req.body.stamina.score,
            "staminaModifier": req.body.stamina.modifier,
            "personalityScore": req.body.personality.score,
            "personalityModifier": req.body.personality.modifier,
            "luckScore": req.body.luck.score,
            "luckModifier": req.body.luck.modifier,
            "intelligenceScore": req.body.intelligence.score,
            "intelligenceModifier": req.body.intelligence.modifier,
            "luckyRoll": req.body.luckyRoll.name,
            "reflexSave": req.body.reflexSave,
            "willPowerSave": req.body.willPowerSave,
            "fortitudeSave": req.body.fortitudeSave,
            "equipment": equipment,
            "ownedWeapons": weapon,
            "ownedArmor": armor,
            "treasure": treasure,
            "languages": req.body.languages,
            "notes": notes,
            "xp": xp,
            "armorClass": req.body.armorClass
        };


            switch (req.body.charClass) {
                case "Cleric":
                    var deity = req.body.classSpecific.deity ? req.body.classSpecific.deity : '';
                    data.deity = deity;
                    data.spellCheck = req.body.classSpecific.spellCheck;
                    data.maximumSpellCastingLevel = req.body.classSpecific.maximumSpellCastingLevel;
                    data.spellsKnown = req.body.classSpecific.spellsKnown;

                    var spellList = "";
                    var spellIterator = 0;
                    while (spellIterator < req.body.classSpecific.spellList.length) {
                        spellList += pad(40, req.body.classSpecific.spellList[spellIterator].spell, " ") + "\n"
                        spellIterator++;
                    }
                    data.spellList = spellList;
                    break;
                case "Thief":
                    data.luckyDie = req.body.classSpecific.luckyDie;
                    data.backstab = req.body.classSpecific.backstab;
                    data.sneakSilently = req.body.classSpecific.sneakSilently;
                    data.hideInShadows = req.body.classSpecific.hideInShadows;
                    data.pickPocket = req.body.classSpecific.pickPocket;
                    data.climbSheerSurfaces = req.body.classSpecific.climbSheerSurfaces;
                    data.pickLock = req.body.classSpecific.pickLock;
                    data.findTrap = req.body.classSpecific.findTrap;
                    data.disableTrap = req.body.classSpecific.disableTrap;
                    data.forgeDocument = req.body.classSpecific.forgeDocument;
                    data.disguiseSelf = req.body.classSpecific.disguiseSelf;
                    data.readLanguages = req.body.classSpecific.readLanguages;
                    data.handlePoison = req.body.classSpecific.handlePoison;
                    data.castSpellFromScroll = req.body.classSpecific.castSpellFromScroll;
                    break;
                case "Warrior":
                    data.luckyWeapon = req.body.classSpecific.luckyWeapon;
                    data.threatRange = req.body.classSpecific.threatRange;
                    break;
                case "Wizard":
                    var patron = req.body.classSpecific.patron ? req.body.classSpecific.patron : '';
                    var familiar = req.body.classSpecific.familiar ? req.body.classSpecific.familiar : '';
                    var corruption = req.body.classSpecific.corruption ? req.body.classSpecific.corruption : '';
                    data.patron = patron;
                    data.familiar = familiar;
                    data.corruption = corruption;
                    data.spellCheck = req.body.classSpecific.spellCheck;
                    data.currentSpellCastingLevel = req.body.classSpecific.currentSpellCastingLevel;
                    data.spellsKnown = req.body.classSpecific.spellsKnown;
                    data.maximumSpellCastingLevel = req.body.classSpecific.maximumSpellCastingLevel;
                    var spellList = "";
                    var spellIterator = 0;
                    while (spellIterator < req.body.classSpecific.spellList.length) {
                        spellList += pad(40, req.body.classSpecific.spellList[spellIterator].spell, " ")
                            + pad(20, req.body.classSpecific.spellList[spellIterator].level.toString(), " ")
                            + pad(25, req.body.classSpecific.spellList[spellIterator].spellChecks, " ")
                            + req.body.classSpecific.spellList[spellIterator].mercurial
                            + "\n"
                        spellIterator++;
                    }
                    data.spellList = spellList;
                    break;
                case "Dwarf":
                    data.luckyWeapon = req.body.classSpecific.luckyWeapon;
                    break;
                case "Halfling":
                    data.stealth = req.body.classSpecific.stealth;
                    break;
                case "Elf":
                    var patron = req.body.classSpecific.patron ? req.body.classSpecific.patron : '';
                    var familiar = req.body.classSpecific.familiar ? req.body.classSpecific.familiar : '';
                    var corruption = req.body.classSpecific.corruption ? req.body.classSpecific.corruption : '';
                    data.patron = patron;
                    data.familiar = familiar;
                    data.corruption = corruption;
                    data.spellCheck = req.body.classSpecific.spellCheck;
                    data.currentSpellCastingLevel = req.body.classSpecific.currentSpellCastingLevel;
                    data.spellsKnown = req.body.classSpecific.spellsKnown;
                    data.maximumSpellCastingLevel = req.body.classSpecific.maximumSpellCastingLevel;
                    var spellList = "";
                    var spellIterator = 0;
                    while (spellIterator < req.body.classSpecific.spellList.length) {
                        spellList += pad(45, req.body.classSpecific.spellList[spellIterator].spell, " ")
                            + pad(20, req.body.classSpecific.spellList[spellIterator].level.toString(), " ")
                            + pad(25, req.body.classSpecific.spellList[spellIterator].spellChecks, " ")
                            + req.body.classSpecific.spellList[spellIterator].mercurial
                            + "\n"
                        spellIterator++;
                    }
                    data.spellList = spellList;
                    break;
            }


        pdfFiller.fillForm(sourcePDF, destinationPDF, data, function () {
            console.log("In callback (we're done)");
        });


        //this is a terrible hack but it works.
        var millisecondsToWait = 1000;
        setTimeout(function() {
            res.send('/assets/' + sheetName + ".pdf");
        }, millisecondsToWait);
       // res.set('Content-Type', 'application/pdf');
       // res.send('/assets/' + sheetName + ".pdf");
        //    , data.characterName + '.pdf', function (err) {
        //    if (err) {
        //        console.log('error in pdf res' + err);
        //    }
        //});
    });

    //for formatting the spell table. I hate life.
    var pad = function (fixedLength, text, fillText)
    {
        var diff = fixedLength - text.length;
        for(var i=0; i < diff; i++)
        {
            text= text + fillText;
        }
        return text
    };

    //look through a character name and title. Check for spaces, replace with underscore
    var noSpace = function (phrase)
    {
        var replaced = phrase.split(' ').join('_');
        return replaced;
    }



    // Return the Express application instance
    return app;
};
