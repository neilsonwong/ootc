'use strict';

const db = require('../sqliteWrapper');
const DbModule = require('./dbModule');

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS passwords (
            userId TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )`,
    
    getPassword:
        `SELECT password from passwords WHERE userId = ?`,
    
    insertPassword:
        `INSERT INTO passwords (userId, password) VALUES(?,?)`,
    
    updatePassword:
        `UPDATE passwords SET password = ? WHERE userId = ?`,
    
};

class PasswordDbModule extends DbModule {
    constructor() {
        super('passwords', sql.createTable);
    }

    async getPassword(userId) {
        const { password } = await db.get(sql.getPassword, [userId]);
        return password;
    }

    // passwords should be encrypted prior to this step!!
    async insertPassword(userId, password) {
        return await db.run(sql.insertPassword, [userId, password]);
    }

    async updatePassword(userId, newPassword) {
        return await db.run(sql.updatePassword, [newPassword, userId]);
    }
}

module.exports = new PasswordDbModule();
