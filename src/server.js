/*
* Archiv osobnich poznamek
* Copyright (c) 2021 Jakub Šenkýř
*/

const hostname = 'localhost';
const port = 8000;

const path = require('path');

const express = require('express');
const session = require('express-session');

const server = express();

server.use(session({
    secret: 'To je přísně tajná informace, Karen! Kdo vám to řekl?!',
    secure: false,
    resave: false,
    saveUninitialized: false,
}));

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

server.listen(port, () => {
    console.log(`Server běží na http://${hostname}:${port}...`);
});
