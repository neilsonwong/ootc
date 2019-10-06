'use strict';

const logger = require('../logger');
const db = require('../db/db');
const bcrypt = require('bcrypt');

async function isValidAdmin(userId, password) {
    if (await isValidUser(userId, password)) {
        const user = await db.users.getUser(userId);
        if (user.admin) {
            logger.debug(`validated ${userId} is admin`);
            return true;
        }
        logger.debug(`${userId} is NOT admin`);
    }
    return false;
}

async function isValidUser(userId, password) {
    const pwHash = await db.passwords.getPassword(userId);
    try {
        return await bcrypt.compare(password, pwHash);
    }
    catch(e) {
        logger.error('an error occured when validating user');
        logger.error(e);
    }
    return false;
}

function isValidUserWithCb(userId, password, cb) {
    isValidUser(userId, password).then(
        result => (cb(null, result)),
        error => (cb(error))
    );
}

function isValidAdminWithCb(userId, password, cb) {
    isValidAdmin(userId, password).then(
        result => (cb(null, result)),
        error => (cb(error))
    );
}

module.exports = {
    isValidAdmin: isValidAdmin,
    isValidUser: isValidUser,
    isValidAdminWithCb: isValidAdminWithCb,
    isValidUserWithCb: isValidUserWithCb,
};
