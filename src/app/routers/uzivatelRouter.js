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
const controller = require(path.join(__dirname, '..', 'controllers', 'uzivatelController'));

// prevod HTTP dotazu na akce controlleru (metoda GET)
router.get('/informace(.json)?', controller.informace);
router.get('/odhlasit', controller.odhlasit);
// prevod HTTP dotazu na akce controlleru (metoda POST)
router.post('/registrovat', controller.registrovat);
router.post('/prihlasit', controller.prihlasit);
router.post('/smazat', controller.smazat);
// prevod HTTP dotazu na renderovani views (metoda GET)
router.get('/registrace', controller.registrace);
router.get('/prihlaseni', controller.prihlaseni);
router.get('/smazani', controller.smazani);
router.get('/profil', controller.profil);

// export vysledneho routeru
module.exports = router;
