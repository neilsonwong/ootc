'use strict';

const db = require('./src/db/db');
const restapi = require('./src/restapi');
const accountManager = require('./src/core/accountManager');
const configChecker = require('./src/util/configChecker');
const emailService = require('./src/services/emailService');

const dbBackupService = require('./src/services/dbBackupService');
const scheduledEmailService = require('./src/services/scheduledEmailService');

async function main() {
    configChecker.checkConfig();
    
    await db.init();
    await accountManager.setupDefaultUsers();
    await emailService.init();

    restapi.init();

    dbBackupService.startCron();
    scheduledEmailService.startCron();
}

main();