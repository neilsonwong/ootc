'use strict';

const child_process = require('child_process');
const fs = require('fs');
const cron = require('node-cron');
const logger = require('../logger');
const config = require('../../config');

let dbBackupJob;

async function dumpDb() {
    logger.info('dump called')
    if (await ensureDeps()) {
        // TODO: make backup dir if needed
        try {
            await fs.promises.access(config.BACKUP_FOLDER, fs.constants.F_OK | fs.constants.W_OK);
        }
        catch (e) {
            logger.error('backup folder does not exist or is not writable');
            return;
        }

        const cmd = `sqlite3 ${config.DB_PATH} .dump > ${config.BACKUP_FOLDER}/database_$(date +%d-%m-%y_%H-%M).dump`;
        logger.info('backing up db with command: \n' + `${cmd}`);
        return new Promise((res, rej) => {
            let result = '';
            const spawned = child_process.spawn('sh', ['-c', cmd]);
            // load: sqlite3 my_database.dump
            spawned.stdout.on('data', (data) => {
                result += data.toString();
            });
            spawned.on('close', (code) => {
                logger.info(`db backup (dump) exited with code: ${code}. (0 is good)`);
                res(result);
            });
        });
    }
    else {
        logger.error('dependencies not satisfied for db backup');
    }
}

async function ensureDeps() {
    const deps = ['sqlite3'];
    const satisfied = await Promise.all(deps.map(dep => (new Promise((res, rej) => {
        child_process.execFile('which', [dep], (err, stdout, stderr) => {
            if (err) {
                logger.error(err);
                res(false);
            }
            else {
                logger.verbose(`found ${dep}`);
                res(true);
            }
        });
    }))));
    return satisfied.reduce((acc, cur) => (acc && cur), true);
}

function startCron() {
    if (!dbBackupJob) {
        // every 5am
        dbBackupJob = cron.schedule('0 5 * * *', () => {
        
        // testing: every 5 minutes
        // dbBackupJob = cron.schedule('*/2 * * * *', () => {
            dumpDb();
        });
    }
    else {
        logger.error('dbBackupService.startCron called more than once');
    }
}

module.exports = {
    startCron: startCron
};
