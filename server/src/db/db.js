'use strict';

const sqliteWrapper = require('./sqliteWrapper');

// add functionaltiy
const users = require('./modules/users');
const departments = require('./modules/departments');
const passwords = require('./modules/passwords');
const reservations = require('./modules/reservations');
const timeSlotDefs = require('./modules/timeSlotDefs');
const timeSlots = require('./modules/timeSlots');

const modules = [];

function importDbModule(/* arguments */) {
    for (let i = 0; i < arguments.length; ++i) {
        // import each db module
        const dbModule = arguments[i];
        modules.push(dbModule);
        if (dbModule.name) {
            module.exports[dbModule.name] = dbModule;
        }
    }
}

async function init() {
    // connect to db
    await sqliteWrapper.connect();
    await createTables();

}

async function createTables() {
    for (const dbModule of modules) {
        await dbModule.createTable();
    }
}

module.exports = {
    init: init
}

importDbModule(users, departments, passwords, 
    reservations, timeSlotDefs, timeSlots);
