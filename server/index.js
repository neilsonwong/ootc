'use strict';

const db = require('./src/db/db');
const restapi = require('./src/restapi');
const accountManager = require('./src/core/accountManager');

async function main() {
    await db.init();
    // await dbTests.test();

    await accountManager.setupAdmin();
    restapi.init();
}

main();