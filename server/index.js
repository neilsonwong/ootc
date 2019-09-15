'use strict';

const dbService = require('./src/services/dbService');
const restapi = require('./src/restapi');

async function main() {
    await dbService.init();
    restapi.init();
}

main();