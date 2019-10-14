'use strict';

const bcrypt = require('bcrypt');
const config = require('../../config');
const db = require('../db/db');
const logger = require('../logger');
const validationService = require('../services/validationService');
const emailService = require('../services/emailService');
const User = require('../models/User');

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
    if (config.DEV_OPTIONS.ENABLED && config.DEV_OPTIONS.OVERRIDE_VALIDATION) {
        user.validated = true;
    }

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

async function createAdmin(username, password) {
    try {
        const admin = new User(username, username, username, '', username, 777777777, 1, 99, '', 1, 1);
        const insertedAdmin = await db.users.insertUser(admin);
        const setPw = await setPassword(username, password)
        if (insertedAdmin && setPw) {
            logger.verbose(`inserted admin with username ${username}`);
            return insertedAdmin;
        }
        else {
            logger.error(`was not able to insert admin into db ${username}`);
        }
    }
    catch(e) {
        logger.error(`was not able to insert admin into db ${username}`);
        logger.error(e);
    }
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

async function isAdmin(userId) {
    try {
        const user = await db.users.getUser(userId);
        return user.admin;
    }
    catch(e) {
       logger.error(`an error occurred when checking if ${userId} is an admin`);
       logger.error(e);
    }
    return false;
}

async function userExists(userId) {
    try {
        const user = await db.users.getUser(userId);
        return user.id === undefined;
    }
    catch(e) {
       logger.error(`an error occurred when checking if ${userId} exists`);
       logger.error(e);
    }
    return false;
}

async function setupDefaultUsers() {
    // check if we have an admin file
    if (config.DEFAULT_USERS_FILE) {
        try {
            logger.info('creating default users');
            const default_users = require.main.require(config.DEFAULT_USERS_FILE);
            // make admins
            for (const admin of default_users.admins) {
                // check if admin is set up
                if (!(await isAdmin(admin.id))) {
                    // not an admin yet, make account
                    if (await createAdmin(admin.id, admin.password)) {
                        logger.info(`created admin with username ${admin.id}`);
                    }
                }
            }

            // make admins
            for (const user of default_users.users) {
                // check if user is set up
                if (!(await userExists(user.id))) {
                    if (await createUser(user.id, user.password)) {
                        logger.info(`created user with username ${user.id}`);
                    }
                }
            }

        }
        catch(e) {
            logger.warn('unable to insert default users on startup');
            logger.warn(e);
        }
    }
}

module.exports = {
    register: register,
    resetPassword: resetPassword,
    isUserValidated: isUserValidated,
    validateUser: validateUser,
    listUsers: listUsers,
    updateUser: updateUser,
    setupEmailValidation: setupEmailValidation,
    isAdmin: isAdmin,
    setupDefaultUsers: setupDefaultUsers
};
