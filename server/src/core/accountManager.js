'use strict';

const bcrypt = require('bcrypt');
const db = require('../db/db');
const logger = require('../logger');
const validationService = require('../services/validationService');
const emailService = require('../services/emailService');

const saltRounds = 10;

async function register(user, password) {
    try {
        const createdUser = await createUser(user);
        if (createdUser) {
            if (await setPassword(createdUser.id, password)) {
                setupEmailValidation(createdUser.id);
                return createdUser;
            }
        }
    }
    catch(e) {
        logger.error(`an error occured when inserting user, email: ${user.email}`);
        logger.error(e);
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
    // strip args in case user submitted them
    // NO CREATING ADMINS!! MAKE USERS THEN CHANGE PERMISSIONS
    user.admin = false;
    user.validated = false;

    // user.id is their email
    user.id = user.email;

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

async function isUserValidated(userId) {
    return await validationService.isUserValidated(userId);
}

async function validateUser(userId, validationCode) {
    return await validationService.validateUser(userId, validationCode);
}

async function setupEmailValidation(userId) {
    const validationCode = validationService.generateValidationCode(userId);
    return await emailService.sendValidationEmail(userId, validationCode);

}

async function listUsers() {

}

async function updateUser() {

}

module.exports = {
    register: register,
    resetPassword: resetPassword,
    isUserValidated: isUserValidated,
    validateUser: validateUser,
    listUsers: listUsers,
    updateUser: updateUser,
    setupEmailValidation: setupEmailValidation,
}
