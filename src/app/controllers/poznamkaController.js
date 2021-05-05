/*
* Archiv osobnich poznamek
* Copyright (c) 2021 Jakub Šenkýř
*/

// vestavene moduly
const path = require('path');

// pouzity model
const model = require(path.join(__dirname, '..', 'models', 'poznamkaModel'));

// pomocny controller
const uzivatel_controller = require(path.join(__dirname, '..', 'controllers', 'uzivatelController'));

// pridani poznamky
exports.pridat = (dotaz, odpoved) => {
    let nadpis = dotaz.body.nadpis;
    let telo = dotaz.body.telo;
    let cas = new Date();
    let autor = uzivatel_controller.prihlaseny(dotaz);
    
    model.nova(nadpis, telo, cas, autor);

    odpoved.json({
        uspech: true,
        url: '/poznamka/prehled',
    });
};

// smazani poznamky
exports.smazat = (dotaz, odpoved) => {
    let id = dotaz.params.id;

    model.odebrat(id);

    odpoved.redirect('/poznamka/prehled');
};

// renderovani views
exports.pridani = (dotaz, odpoved) => {
    odpoved.render('poznamka/pridani', {
        titulek: 'Přidání poznámky',
        klient: 'poznamka/pridani.js',
    });
};
exports.prehled = (dotaz, odpoved) => {
    let autor = uzivatel_controller.prihlaseny(dotaz);
    let poznamky = model.vsechny(autor).reverse();

    odpoved.render('poznamka/prehled', {
        titulek: 'Moje poznámky',
        klient: 'poznamka/prehled.js',
        poznamky,
    });
};
exports.detail = (dotaz, odpoved) => {
    let id = dotaz.params.id;

    let poznamka = model.nacist(id);

    odpoved.render('poznamka/detail', {
        titulek: 'Detail poznámky',
        klient: 'poznamka/detail.js',
        poznamka,
    });
};
