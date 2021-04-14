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

// pouzity controller
const uzivatel_controller = require(path.join(__dirname, '..', 'controllers', 'uzivatelController'));

// nemame indexovou stranku
router.get([
        '/',
        '/index(.html)?',
    ], (dotaz, odpoved) => {

    odpoved.redirect('/profil');
});

// nektere casti muze videt pouze radne prihlaseny uzivatel
router.get([
    '(/html)?/profil(.html)?',
    '(/html)?/smazani(.html)?',
    ], (dotaz, odpoved, pokracovani) => {
    
    if(uzivatel_controller.neprihlaseny(dotaz, odpoved)) {
        odpoved.redirect('/prihlaseni');
    } else {
        pokracovani();
    }
});

// zkracene URL se doplni o adresar s HTML soubory
router.get([
    '/prihlaseni(.html)?',
    '/registrace(.html)?',
    '/profil(.html)?',
    '/smazani(.html)?',
    ], (dotaz, odpoved, pokracovani) => {

    dotaz.url = '/html' + dotaz.url;
    
    pokracovani();
});

// zkracene URL se doplni o koncovku HTML souboru
router.get([
    '(/html)?/prihlaseni',
    '(/html)?/registrace',
    '(/html)?/profil',
    '(/html)?/smazani',
], (dotaz, odpoved, pokracovani) => {
    
    dotaz.url = dotaz.url + '.html';
    
    pokracovani();
});

// export vysledneho routeru
module.exports = router;
