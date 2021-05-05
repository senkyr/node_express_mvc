/*
* Archiv osobnich poznamek
* Copyright (c) 2021 Jakub Šenkýř
*/

// vestavene moduly
const path = require('path');

// pouzite modely
const uzivatel_model = require(path.join(__dirname, '..', 'models', 'uzivatel'));
const poznamka_model = require(path.join(__dirname, '..', 'models', 'poznamka'));

// informace o prihlasenem uzivateli
exports.informace = (dotaz, odpoved) => {
    if(dotaz.session.uzivatel == undefined) {
        odpoved.json();
    } else {
        odpoved.json({
            jmeno: dotaz.session.uzivatel
        });
    }
};

// registrace uzivatele
exports.registrovat = (dotaz, odpoved) => {
    let jmeno = dotaz.body.jmeno;
    let heslo = dotaz.body.heslo;
    let email = dotaz.body.email;

    if(uzivatel_model.existuje(jmeno)) {
        odpoved.json({
            uspech: false,
            hlaseni: 'Vyberte jiné jméno.',
        });
    } else {
        uzivatel_model.pridat(jmeno, heslo, email);

        odpoved.json({
            uspech: true,
            url: '/uzivatel/prihlaseni',
        });
    }
};

// prihlaseni uzivatele
exports.prihlasit = (dotaz, odpoved) => {
    let jmeno = dotaz.body.jmeno;
    let heslo = dotaz.body.heslo;

    if(!uzivatel_model.existuje(jmeno)) {
        odpoved.json({
            uspech: false,
            hlaseni: 'Uživatel neexistuje.',
        });
    } else {
        if(!uzivatel_model.overit(jmeno, heslo)) {
            odpoved.json({
                uspech: false,
                hlaseni: 'Chybné heslo.',
            });
        } else {
            dotaz.session.uzivatel = jmeno;

            odpoved.json({
                uspech: true,
                url: '/uzivatel/profil',
            });            
        }
    }
};

// smazani uzivatele
exports.smazat = (dotaz, odpoved) => {
    let jmeno = dotaz.session.uzivatel;
    let heslo = dotaz.body.heslo;

    if(!uzivatel_model.overit(jmeno, heslo)) {
        odpoved.json({
            uspech: false,
            hlaseni: 'Chybné heslo.',
        });
    } else {
        uzivatel_model.odebrat(jmeno);

        poznamka_model.zapomenout(jmeno);

        odpoved.json({
            uspech: true,
            url: '/uzivatel/odhlasit',
        });
    }
};

// odhlaseni prihlaseneho uzivatele
exports.odhlasit = (dotaz, odpoved) => {
    dotaz.session.destroy();
    odpoved.redirect('/');
};

// pomocne funkce pro ostatni controllery
exports.neprihlaseny = (dotaz) => {
    return (dotaz.session.uzivatel == undefined);
};
exports.prihlaseny = (dotaz) => {
    return dotaz.session.uzivatel;
};

// renderovani views
exports.registrace = (dotaz, odpoved) => {
    odpoved.render('uzivatel/registrace', {
        titulek: 'Registrace',
        klient: 'uzivatel/registrace.js',
    });
};
exports.prihlaseni = (dotaz, odpoved) => {
    odpoved.render('uzivatel/prihlaseni', {
        titulek: 'Přihlášení',
        klient: 'uzivatel/prihlaseni.js',
    });
};
exports.smazani = (dotaz, odpoved) => {
    odpoved.render('uzivatel/smazani', {
        titulek: 'Smazání účtu',
        klient: 'uzivatel/smazani.js',
    });
};
exports.profil = (dotaz, odpoved) => {
    odpoved.render('uzivatel/profil', {
        titulek: 'Profil',
        klient: 'uzivatel/profil.js',
        uzivatel: dotaz.session.uzivatel,
    });
};
