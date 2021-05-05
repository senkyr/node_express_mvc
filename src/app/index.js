/*
* Archiv osobnich poznamek
* Copyright (c) 2021 Jakub Šenkýř
*/

// vestavene moduly
const path = require('path');
// doinstalovane moduly
const express = require('express');
const session = require('express-session');

// vytvoreni aplikace
const app = express();
// konfigurace aplikace
const { key } = require(path.join(__dirname, '..', 'config'));
// soucasti aplikace
const indexRouter = require(path.join(__dirname, 'routers', 'indexRouter'));
const uzivatelRouter = require(path.join(__dirname, 'routers', 'uzivatelRouter'));
const poznamkaRouter = require(path.join(__dirname, 'routers', 'poznamkaRouter'));

// pouzity templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

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
// staticke soubory
app.use(express.static(path.join(__dirname, 'public')));

// routovani
app.use('/', indexRouter);
app.use('/uzivatel', uzivatelRouter);
app.use('/poznamka', poznamkaRouter);

// export aplikace pro pouziti v serveru
module.exports = app;
