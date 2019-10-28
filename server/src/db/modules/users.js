'use strict';

const db = require('../sqliteWrapper');
const logger = require('../../logger');
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
            phone INTEGER,
            age INTEGER NOT NULL,
            experience INTEGER,
            comments TEXT,
            validated BOOLEAN NOT NULL,
            admin INTEGER
        )`,

    insertUser: 
        `INSERT INTO users (
            id, fname, mname, lname, email, phone,
            age, experience, comments, validated, admin
        )
        VALUES(
            $id, $fname, $mname, $lname, $email, $phone,
            $age, $experience, $comments, $validated, $admin
        )`,

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
        `SELECT * FROM users`,
    
    getUser:
        `SELECT * FROM users WHERE id = $id`

    // ban users? delete users?
};

class UserDbModule extends DbModule {
    constructor() {
        super('users', sql.createTable, User);
    }

    async insertUser(user) {
        user = this.fixType(user);
        const { lastID } = await db.run(sql.insertUser, user.prepare(sql.insertUser));
        if (lastID) {
            logger.verbose(`inserted user with id ${user.id} as rowid: ${lastID}`);
            return user;
        }
    }

    async updateUser(user) {
        user = this.fixType(user);
        return await db.run(sql.updateUser, user.prepare(sql.updateUser));
    }

    async validateUser(id) {
        return await db.run(sql.validateUser, [true, id]);
    }

    async updateAdminStatus(id, isAdmin) {
        // const isAdminInt = isAdmin ? 1 : 0;
        return await db.run(sql.updateAdminStatus, [isAdmin, id]);
    }

    async listUsers() {
        const rows = await db.all(sql.listUsers);
        return rows.map(e => this.fixType(e));
    }

    async getUser(userId) {
        return this.fixType(await db.get(sql.getUser, [userId]));
    }
}

module.exports = new UserDbModule();
