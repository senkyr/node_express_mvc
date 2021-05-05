/*
* Archiv osobnich poznamek
* Copyright (c) 2021 Jakub Šenkýř
*/

// vestavene moduly
const path = require('path');
// doinstalovane moduly
const jsondb = require('simple-json-db');

// pripojeni k databazi
const db_poznamky = new jsondb(path.join(__dirname, '..', '..', '..', 'data', 'poznamky.json'));

// inicializace prazdne databaze
if(!db_poznamky.has('id')) {
    db_poznamky.set('id', 1);
}

// pridani nove poznamky o databaze
exports.nova = (nadpis, telo, cas, autor) => {
    let id = db_poznamky.get('id');

    db_poznamky.set('id', id + 1);

    db_poznamky.set(id, {
        nadpis, telo, cas, autor,
    });
};

// ziskani vsech poznamek daneho autora
exports.vlastni = (autor) => {
    let db_dump = db_poznamky.JSON();

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
