/*
* Archiv osobnich poznamek
* Copyright (c) 2021 Jakub Šenkýř
*/

// vestavene moduly
const path = require('path');
// doinstalovane moduly
const jsondb = require('simple-json-db');

// pripojeni k databazi
const databaze = new jsondb(path.join(__dirname, '..', '..', '..', 'data', 'poznamky.json'));

// inicializace prazdne databaze
if(!databaze.has('id')) {
    databaze.set('id', 1);
}

// pridani nove poznamky o databaze
exports.nova = (nadpis, telo, cas, autor) => {
    let id = databaze.get('id');

    databaze.set('id', id + 1);

    databaze.set(id, {
        nadpis, telo, cas, autor,
    });
};

// ziskani vsech poznamek daneho autora
exports.vsechny = (autor) => {
    let db_dump = databaze.JSON();

    let vysledek = [];

    for(id in db_dump) {
        if(db_dump[id].autor == autor) {

            db_dump[id].cas = new Date(db_dump[id].cas);
            db_dump[id].id = id;

            vysledek.push(db_dump[id]);
        }
    }

    return vysledek;
};

// ziskani jedne konkretni poznamky
exports.nacist = (id) => {
    let poznamka = databaze.get(id);

    poznamka.cas = new Date(poznamka.cas);
    poznamka.id = id;

    return poznamka;
};

// odebrani jedne konkretni poznamky
exports.odebrat = (id) => {
    databaze.delete(id);
};

// odebrani vsech poznamek konkretniho uzivatele
exports.zapomenout = (autor) => {
    let db_dump = databaze.JSON();

    for(id in db_dump) {
        if(db_dump[id].autor == autor) {
            databaze.delete(id);
        }
    }
};
