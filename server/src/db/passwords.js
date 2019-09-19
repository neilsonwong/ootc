'use strict';

const db = require('./sqliteWrapper');

async function createTable() {
    return await db.run(sql.createTable);
}

async function getPassword(userId) {
    return await db.get(sql.getPassword, [userId]);
}

// passwords should be encrypted prior to this step!!
async function insertPassword(userId, password) {
    return await db.run(sql.insertPassword, [userId, password]);
}

async function updatePassword(userId, newPassword) {
    return await db.run(sql.updatePassword, [newPassword, userId]);
}

module.exports = {
    name: 'passwords',
    createTable: createTable,
    getPassword: getPassword,
    insertPassword: insertPassword,
    updatePassword: updatePassword,
};

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS passwords (
            userId TEXT UNIQUE NOT NULL,
            password TEXT
        )`,
    
    getPassword:
        `SELECT password from passwords WHERE userId = ?`,
    
    insertPassword:
        `INSERT INTO passwords (userId, password) VALUES(?,?)`,
    
    updatePassword:
        `UPDATE passwords SET password = ? WHERE userId = ?`,
    
};
