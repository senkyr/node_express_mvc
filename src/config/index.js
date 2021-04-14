// doinstalovane moduly
const dotenv = require('dotenv');

// nacteni konfiguracniho souboru
dotenv.config();

// export nactene konfigurace
module.exports = {
    host: process.env.HOST,
    port: process.env.PORT,
    key: process.env.KEY,
};
