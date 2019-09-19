'use strict';

const db = require('../sqliteWrapper');
const DbModule = require('./dbModule');
const User = require('../../models/User');

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS users (
            id TEXT NOT NULL UNIQUE PRIMARY KEY,
            fname TEXT NOT NULL,
            mname TEXT,
            lname TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone CHAR(10),
            age INTEGER NOT NULL,
            experience INTEGER,
            comments TEXT,
            validated BOOLEAN NOT NULL,
            admin INTEGER
        )`,

    insertUser: 
        `INSERT INTO users (
            id,
            fname,
            mname,
            lname,
            email,
            phone,
            age,
            experience,
            comments,
            validated,
            admin
        )
        VALUES(
            $id,
            $fname,
            $mname,
            $lname,
            $email,
            $phone,
            $age,
            $experience,
            $comments,
            $validated,
            $admin)`,

    updateUser:
        `UPDATE users SET 
            fname = $fname,
            mname = $mname,
            lname = $lname,
            phone = $phone,
            age = $age,
            experience = $experience,
            comments = $comments
        WHERE id = $id`,

    validateUser:
        `UPDATE users SET validated = ? 
        WHERE id = ?`,

    updateAdminStatus: 
        `UPDATE users SET admin = ? 
        WHERE id = ?`,

    listUsers: 
        `SELECT * FROM users`

    // ban users? delete users?
};

class UserDbModule extends DbModule {
    constructor() {
        super('users', sql.createTable);
    }

    async insertUser(user) {
        return await db.run(sql.insertUser, user.prepare(sql.insertUser));
    }

    async updateUser(user) {
        return await db.run(sql.updateUser, user.prepare(sql.updateUser));
    }

    async validateUser(id) {
        return await db.run(sql.validateUser, [id]);
    }

    async updateAdminStatus(id, isAdmin) {
        // const isAdminInt = isAdmin ? 1 : 0;
        return await db.run(sql.updateAdminStatus, [isAdmin, id]);
    }

    async listUsers() {
        const rows = await db.all(sql.listUsers);
        return rows.map(e => Object.assign(new User(), e));
    }
}

module.exports = new UserDbModule();
