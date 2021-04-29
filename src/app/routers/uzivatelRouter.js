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

// prevod HTTP dotazu na akce controlleru (metoda GET)
router.get('/informace(.json)?', uzivatel_controller.informace);
router.get('/odhlasit', uzivatel_controller.odhlasit);
// prevod HTTP dotazu na akce controlleru (metoda POST)
router.post('/registrovat', uzivatel_controller.registrovat);
router.post('/prihlasit', uzivatel_controller.prihlasit);
router.post('/smazat', uzivatel_controller.smazat);
// prevod HTTP dotazu na renderovani views (metoda GET)
router.get('/registrace', uzivatel_controller.registrace);
router.get('/prihlaseni', uzivatel_controller.prihlaseni);
router.get('/smazani', uzivatel_controller.smazani);
router.get('/profil', uzivatel_controller.profil);

// export vysledneho routeru
module.exports = router;
