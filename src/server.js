/*
* Archiv osobnich poznamek
* Copyright (c) 2021 Jakub Šenkýř
*/

// vestavene moduly
const path = require('path');

// doinstalovane moduly
const http = require('http');

// konfigurace aplikace
const { host, port } = require(path.join(__dirname, 'config'));

// soucasti aplikace
const app = require(path.join(__dirname, 'app'));

// spusteni serveru
http.createServer(app).listen(port, host, () => {
    console.log(`Server běží na http://${host}:${port}...`);
});
