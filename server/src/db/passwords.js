'use strict';

const db = require('./sqliteWrapper');

async function createTable() {
    return await db.run(sql.createTable);
}

module.exports = {
    name: 'passwords',
    createTable: createTable
};

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS passwords (
            userId TEXT UNIQUE NOT NULL,
            password TEXT
        )`
};
