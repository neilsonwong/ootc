'use strict';

const db = require('../sqliteWrapper');
const DbModule = require('./dbModule');

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS passwords (
            userId TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            resetCode TEXT
        )`,
    
    getPassword:
        `SELECT password from passwords WHERE userId = ?`,

    getResetCode:
        `SELECT resetCode from passwords WHERE userId = ?`,

    insertPassword:
        `INSERT INTO passwords (userId, password) VALUES(?,?)`,
    
    updatePassword:
        `UPDATE passwords SET password = ? WHERE userId = ?`,

    updateResetCode:
        `UPDATE passwords SET resetCode = ? WHERE userId = ?`
};

class PasswordDbModule extends DbModule {
    constructor() {
        super('passwords', sql.createTable);
    }

    async getPassword(userId) {
        const response = await db.get(sql.getPassword, [userId]);
        return response ? response.password : undefined;
    }

    async getResetCode(userId) {
        const response = await db.get(sql.getResetCode, [userId]);
        return response ? response.resetCode : undefined;
    }

    // passwords should be encrypted prior to this step!!
    async insertPassword(userId, password) {
        return await db.run(sql.insertPassword, [userId, password]);
    }

    async updatePassword(userId, newPassword) {
        return await db.run(sql.updatePassword, [newPassword, userId]);
    }

    async updateResetCode(userId, resetCode) {
        return await db.run(sql.updateResetCode, [resetCode, userId]);
    }
}

module.exports = new PasswordDbModule();
