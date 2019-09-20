'use strict';

const bcrypt = require('bcrypt');
const db = require('../db/db');
const logger = require('../logger');
const validationService = require('../services/validationService');

const saltRounds = 10;

async function register(user, password) {
    try {
        const createdUser = await createUser(user);
        if (createdUser) {
            if (await setPassword(createdUser.id, password)) {
                return createdUser;
            }
        }
    }
    catch(e) {
        logger.error(`an error occured when inserting user, email: ${user.email}`);
    }
    return null;
}

async function setPassword(userId, password) {
    try {
        const pwHash = await bcrypt.hash(password, saltRounds);
        await db.passwords.insertPassword(userId, pwHash);
        return pwHash;
    }
    catch(e) {
       logger.error('an error occurred when setting the password');
       logger.error(e);
    }
    return null;
}

async function resetPassword(userId) {
    const randomPassword =  Math.random().toString(36).substring(2, 15);
    return await setPassword(userId, randomPassword);
}

async function ban(user) {
    logger.error('BAN USER IS NOT YET IMPLEMENTED');
}

async function createUser(user) {
    const insertedUser = await db.users.insertUser(user);
    if (insertedUser) {
        logger.verbose(`inserted user with email ${insertedUser.email} into db as id ${insertedUser.lastId}`);
        return insertedUser;
    }
    else {
        logger.error(`was not able to insert user into db ${user.email}`);
    }
    return insertedUser;
}

async function validateUser(userId, validationCode) {
    return await validationService.validateUser(userId, validationCode);
}

async function listUsers() {

}

async function updateUser() {

}

module.exports = {
    register: register,
    resetPassword: resetPassword,
    validateUser: validateUser,
    listUsers: listUsers,
    updateUser: updateUser,
}
