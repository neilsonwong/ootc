'use strict';

const db = require('./sqliteWrapper');

async function createTable() {
    return await db.run(sql.createTable);
}

module.exports = {
    name: 'timeSlots',
    createTable: createTable
};

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS timeSlots (
            id INTEGER PRIMARY KEY,
            datetime INTGER,
            duration INTEGER,
            signUpCap INTEGER
        )`,
};
