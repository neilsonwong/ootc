'use strict';

const db = require('./sqliteWrapper');

async function createTable() {
    return await db.run(sql.createTable);
}

module.exports = {
    name: 'timeSlotDefs',
    createTable: createTable
};

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS timeSlotDefs (
            id INTEGER PRIMARY KEY,
            dayOfWeek INTEGER,
            startTime  INTEGER,
            duration INTEGER,
            signUpCap INTEGER,
            year INTEGER
        )`,
};
