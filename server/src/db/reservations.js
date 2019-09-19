'use strict';

const db = require('./sqliteWrapper');

async function createTable() {
    return await db.run(sql.createTable);
}

module.exports = {
    name: 'reservations',
    createTable: createTable
};

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY,
            userId INTEGER,
            timeSlot INTEGER,
            attended INTEGER
        )`,
};
