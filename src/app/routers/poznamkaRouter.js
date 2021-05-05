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
const controller = require(path.join(__dirname, '..', 'controllers', 'poznamkaController'));

// prevod HTTP pozadavku na akce controlleru (metoda POST)
router.post('/pridat', controller.pridat);
// prevod HTTP pozadavku na renderovani views (metoda GET)
router.get('/pridani', controller.pridani);
router.get('/vsechny', controller.vsechny);

// export vysledneho routeru
module.exports = router;
