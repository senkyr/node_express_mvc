/*
* Archiv osobnich poznamek
* Copyright (c) 2021 Jakub Šenkýř
*/

// vestavene moduly
const path = require('path');

// pouzity model
const model = require(path.join(__dirname, '..', 'models', 'poznamka.js'));

// pomocny controller
const uzivatel_controller = require(path.join(__dirname, '..', 'controllers', 'uzivatelController'));

// pridani poznamky
exports.pridat = (dotaz, odpoved) => {
    let nadpis = dotaz.body.nadpis;
    let telo = dotaz.body.telo;
    let cas = new Date();
    let autor = uzivatel_controller.prihlaseny(dotaz, odpoved);
    
    model.nova(nadpis, telo, cas, autor);

    odpoved.json({
        uspech: true,
        url: '/poznamka/vsechny',
    });
};

// renderovani views
exports.pridani = (dotaz, odpoved) => {
    odpoved.render('poznamka/pridani', {
        titulek: 'Přidání poznámky',
        klient: 'poznamka/pridani.js',
    });
};
exports.vsechny = (dotaz, odpoved) => {
    let autor = uzivatel_controller.prihlaseny(dotaz, odpoved);
    let poznamky = model.vlastni(autor);

    odpoved.render('poznamka/vsechny', {
        titulek: 'Moje poznámky',
        klient: 'poznamka/vsechny.js',
        poznamky,
    });
};
