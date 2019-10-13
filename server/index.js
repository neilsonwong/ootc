'use strict';

const db = require('./src/db/db');
const restapi = require('./src/restapi');
const accountManager = require('./src/core/accountManager');
const configChecker = require('./src/util/configChecker');

async function main() {
    configChecker.checkConfig();
    
    await db.init();
    await accountManager.setupDefaultUsers();
    restapi.init();
}

main();