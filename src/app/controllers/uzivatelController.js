/*
* Archiv osobnich poznamek
* Copyright (c) 2021 Jakub Šenkýř
*/

// vestavene moduly
const path = require('path');

// pouzity model
const Uzivatel = require(path.join(__dirname, '..', 'models', 'uzivatel'));

// informace o prihlasenem uzivateli
exports.informace = (dotaz, odpoved) => {
    if(dotaz.session.uzivatel == undefined) {
        odpoved.json();
    } else {
        odpoved.json({ jmeno: dotaz.session.uzivatel });
    }
};

// registrace uzivatele
exports.registrovat = (dotaz, odpoved) => {
    let jmeno = dotaz.body.jmeno;
    let heslo = dotaz.body.heslo;
    let email = dotaz.body.email;

    if(Uzivatel.existuje(jmeno)) {
        odpoved.json({ uspech: false, hlaseni: 'Vyberte jiné jméno.'});
    } else {
        Uzivatel.pridat(jmeno, heslo, email);

        odpoved.json({ uspech: true, url: '/uzivatel/prihlaseni' });
    }
};

// prihlaseni uzivatele
exports.prihlasit = (dotaz, odpoved) => {
    let jmeno = dotaz.body.jmeno;
    let heslo = dotaz.body.heslo;

    if(!Uzivatel.existuje(jmeno)) {
        odpoved.json({ uspech: false, hlaseni: 'Uživatel neexistuje.'});
    } else {
        if(!Uzivatel.overit(jmeno, heslo)) {
            odpoved.json({ uspech: false, hlaseni: 'Chybné heslo.'});
        } else {
            dotaz.session.uzivatel = jmeno;

            odpoved.json({ uspech: true, url: '/uzivatel/profil' });            
        }
    }
};

// smazani uzivatele
exports.smazat = (dotaz, odpoved) => {
    let jmeno = dotaz.session.uzivatel;
    let heslo = dotaz.body.heslo;

    if(!Uzivatel.overit(jmeno, heslo)) {
        odpoved.json({ uspech: false, hlaseni: 'Chybné heslo.'});
    } else {
        Uzivatel.odebrat(jmeno);

        odpoved.json({ uspech: true, url: '/uzivatel/odhlasit' });
    }
};

// odhlaseni prihlaseneho uzivatele
exports.odhlasit = (dotaz, odpoved) => {
    dotaz.session.destroy();
    odpoved.redirect('/');
};

// kontrola prihlaseneho uzivatele
exports.neprihlaseny = (dotaz, odpoved) => {
    return (dotaz.session.uzivatel == undefined);
};

// renderovani views
exports.registrace = (dotaz, odpoved) => {
    odpoved.render('registrace');
};
exports.prihlaseni = (dotaz, odpoved) => {
    odpoved.render('prihlaseni');
};
exports.smazani = (dotaz, odpoved) => {
    odpoved.render('smazani');
};
exports.profil = (dotaz, odpoved) => {
    odpoved.render('profil', {
        uzivatel: dotaz.session.uzivatel,
    });
};
