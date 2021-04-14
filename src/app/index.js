/*
* Archiv osobnich poznamek
* Copyright (c) 2021 Jakub Šenkýř
*/

// vestavene moduly
const path = require('path');
// doinstalovane moduly
const express = require('express');
const favicon = require('serve-favicon');
const session = require('express-session');

// vytvoreni aplikace
const app = express();
// konfigurace aplikace
const { key } = require(path.join(__dirname, '..', 'config'));
// soucasti aplikace
const indexRouter = require(path.join(__dirname, 'routers', 'indexRouter'));
const uzivatelRouter = require(path.join(__dirname, 'routers', 'uzivatelRouter'));

// middleware pro praci se session
app.use(session({
    secret: key,
    secure: false,
    resave: false,
    saveUninitialized: false,
    cookie: { sameSite: 'strict' },
}));
// middleware pro praci s JSON daty
app.use(express.json());
// middleware pro praci s favicon
app.use(favicon(path.join(__dirname, 'www', 'favicon.ico')));

// routovani
app.use('/', indexRouter);
app.use('/uzivatel', uzivatelRouter);
// staticke soubory
app.use(express.static(path.join(__dirname, 'www')));

// export aplikace pro pouziti v serveru
module.exports = app;
