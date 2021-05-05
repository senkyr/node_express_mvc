/*
* Archiv osobnich poznamek
* Copyright (c) 2021 Jakub Šenkýř
*/

// vestavene moduly
const path = require('path');
// doinstalovane moduly
const express = require('express');

// vytvoreni routeru
const router = express.Router();

// pomocny controller
const uzivatel_controller = require(path.join(__dirname, '..', 'controllers', 'uzivatelController'));

// nemame indexovou stranku
router.get([
        '/',
        '/index(.html)?',
    ], (dotaz, odpoved) => {

    odpoved.redirect('/uzivatel/profil');
});

// nektere casti muze videt pouze radne prihlaseny uzivatel
router.get([
    '/uzivatel/profil',
    '/uzivatel/smazani',
    ], (dotaz, odpoved, pokracovani) => {
    
    if(uzivatel_controller.neprihlaseny(dotaz)) {
        odpoved.redirect('/uzivatel/prihlaseni');
    } else {
        pokracovani();
    }
});
router.get([
    '/poznamka/pridani',
    '/poznamka/vsechny',
    ], (dotaz, odpoved, pokracovani) => {
    
    if(uzivatel_controller.neprihlaseny(dotaz)) {
        odpoved.redirect('/uzivatel/prihlaseni');
    } else {
        pokracovani();
    }
});

// export vysledneho routeru
module.exports = router;
