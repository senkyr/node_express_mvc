/*
* Archiv osobnich poznamek
* Copyright (c) 2021 Jakub Šenkýř
*/

// parametry pripojeni
const hostname = 'localhost';
const port = 8000;

// vestavene moduly
const path = require('path');

// doinstalovane moduly
const express = require('express');
const session = require('express-session');
const jsondb = require('simple-json-db');
const bcrypt = require('bcrypt');

// soucasti aplikace
const server = express();
const db_uzivatele = new jsondb(path.join('..', 'data', 'uzivatele.json'));

// middleware pro praci se session
server.use(session({
    secret: 'To je přísně tajná informace, Karen! Kdo vám to řekl?!',
    secure: false,
    resave: false,
    saveUninitialized: false,
    cookie : { sameSite: 'strict' },
}));
// middleware pro praci s JSON daty
server.use(express.json());

// nemame indexovou stranku
server.get(['/', '/index(.html)?'], (dotaz, odpoved, pokracovani) => {
    if(dotaz.session.uzivatel == undefined)
        odpoved.redirect('/prihlaseni');
    else
        odpoved.redirect('/profil');
});

// nektere casti muze videt pouze radne prihlaseny uzivatel
server.get(['/profil(.html)?', '/smazani(.html)?'], (dotaz, odpoved, pokracovani) => {
    if(dotaz.session.uzivatel == undefined) {
        odpoved.redirect('/prihlaseni')
    } else {
        pokracovani();
    }
});

// zkracene URL se doplni o koncovky souboru
server.get(['/prihlaseni', '/registrace', '/profil', '/smazani'], (dotaz, odpoved, pokracovani) => {
    dotaz.url += '.html';

    pokracovani();
});

// informace o prihlasenem uzivateli
server.get('/uzivatel(.json)?', (dotaz, odpoved, pokracovani) => {
    if(dotaz.session.uzivatel == undefined) {
        odpoved.send();
    } else {
        odpoved.json({ jmeno: dotaz.session.uzivatel });
    }
});

// odhlaseni prihlaseneho uzivatele
server.get('/odhlasit', (dotaz, odpoved, pokracovani) => {
    dotaz.session.destroy();

    odpoved.redirect('/');
});

// vsechno ostatni je pristupne jako staticke soubory
server.use(express.static(path.join(__dirname, 'www')));

// registrace uzivatele
server.post(['/registrace(.html)?'], (dotaz, odpoved) => {
    let jmeno = dotaz.body.jmeno;
    let heslo = dotaz.body.heslo;
    let email = dotaz.body.email;

    if(db_uzivatele.has(jmeno)) {
        odpoved.json({ uspech: false, hlaseni: 'Vyberte jiné jméno.'});
    } else {
        db_uzivatele.set(jmeno, {
            heslo: bcrypt.hashSync(heslo, 10),
            email: email,
        });

        odpoved.json({ uspech: true, url: '/prihlaseni' });
    }
});

// prihlaseni uzivatele
server.post(['/prihlaseni(.html)?'], (dotaz, odpoved) => {
    let jmeno = dotaz.body.jmeno;
    let heslo = dotaz.body.heslo;

    if(!db_uzivatele.has(jmeno)) {
        odpoved.json({ uspech: false, hlaseni: 'Uživatel neexistuje.'});
    } else {
        let uzivatel = db_uzivatele.get(jmeno);

        if(!bcrypt.compareSync(heslo, uzivatel.heslo)) {
            odpoved.json({ uspech: false, hlaseni: 'Chybné heslo.'});
        } else {
            dotaz.session.uzivatel = jmeno;

            odpoved.json({ uspech: true, url: '/profil' });
        }
    }
});

server.listen(port, () => {
    console.log(`Server běží na http://${hostname}:${port}...`);
});
