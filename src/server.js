/*
* Archiv osobnich poznamek
* Copyright (c) 2021 Jakub Šenkýř
*/

const hostname = 'localhost';
const port = 8000;

const path = require('path');

const express = require('express');
const session = require('express-session');
const jsondb = require('simple-json-db');
const bcrypt = require('bcrypt');

const server = express();
const db_uzivatele = new jsondb(path.join('..', 'data', 'uzivatele.json'));

// middleware pro praci se session
server.use(session({
    secret: 'To je přísně tajná informace, Karen! Kdo vám to řekl?!',
    secure: false,
    resave: false,
    saveUninitialized: false,
}));
// middleware pro praci s JSON daty
server.use(express.json());

// nemame indexovou stranku
server.get(['/', 'index(.html)?'], (dotaz, odpoved) => {
    if(dotaz.session.uzivatel == undefined)
        odpoved.redirect('/prihlaseni.html');
    else
        odpoved.redirect('/profil.html');
});

// bez prihlaseni nelze nektere casti videt
server.get(['/profil(.html)?', '/zruseni(.html)?'], (dotaz, odpoved) => {
    if(dotaz.session.uzivatel == undefined)
        odpoved.redirect('/prihlaseni.html')
});

// zkracene URL se doplni o koncovky souboru
server.get(['/prihlaseni', '/registrace'], () => {
    odpoved.redirect(dotaz.url + '.html');
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

server.listen(port, () => {
    console.log(`Server běží na http://${hostname}:${port}...`);
});
