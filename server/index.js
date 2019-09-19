'use strict';

const db = require('./src/db/db');
const dbTests = require('./src/db/dbTests');
const restapi = require('./src/restapi');

async function main() {
    await db.init();
    await dbTests.test();
    restapi.init();
}

main();