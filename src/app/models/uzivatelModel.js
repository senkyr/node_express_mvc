/*
* Archiv osobnich poznamek
* Copyright (c) 2021 Jakub Šenkýř
*/

//vestavene moduly
const path = require('path');
// doinstalovane moduly
const bcrypt = require('bcrypt');
const jsondb = require('simple-json-db');

// pripojeni k databazi
const databaze = new jsondb(path.join('..', 'data', 'uzivatele.json'));

// overeni existence daneho uzivatele
exports.existuje = (jmeno) => {
    return databaze.has(jmeno);
};

// overeni hesla daneho uzivatele
exports.overit = (jmeno, heslo) => {
    let uzivatel = databaze.get(jmeno);

    return bcrypt.compareSync(heslo, uzivatel.heslo);
};

// pridani noveho uzivatele do databaze
exports.pridat = (jmeno, heslo, email) => {
    databaze.set(jmeno, {
        heslo: bcrypt.hashSync(heslo, 10),
        email: email,
    });
};

// odebrani uzivatele z databaze
exports.odebrat = (jmeno) => {
    databaze.delete(jmeno);
};
