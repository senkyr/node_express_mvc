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
const poznamkaController = require(path.join(__dirname, '..', 'controllers', 'poznamkaController'));

// prevod HTTP pozadavku na akce controlleru (metoda POST)
router.post('/pridat', poznamkaController.pridat);
// prevod HTTP pozadavku na renderovani views (metoda GET)
router.get('/pridani', poznamkaController.pridani);
router.get('/vsechny', poznamkaController.vsechny);

// export vysledneho routeru
module.exports = router;
