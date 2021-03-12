/*
* Archiv osobnich poznamek
* Copyright (c) 2021 Jakub Šenkýř
*/

const hostname = 'localhost';
const port = 8000;

const express = require('express');

const server = express();

server.get('/', (dotaz, odpoved) => {
    odpoved.send('Aplikace je ve výstavbě...');
});

server.listen(port, () => {
    console.log(`Server běží na http://${hostname}:${port}...`);
});
