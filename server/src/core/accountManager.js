'use strict';

const bcrypt = require('bcrypt');
const config = require('../../config');
const db = require('../db/db');
const logger = require('../logger');
const validationService = require('../services/validationService');
const emailService = require('../services/emailService');
const authService = require('../services/authService');
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

async function changePassword(userId, resetCode, oldPassword, newPassword) {
    if (resetCode) {
        const curResetCode = await db.passwords.getResetCode(userId);
        if (resetCode === curResetCode) {
            if (await updatePassword(userId, newPassword)) {
                await db.passwords.updateResetCode(userId, null);
                return true;
            }
        }
    }
    else if (oldPassword) {
        if (await authService.isValidUser(userId, oldPassword)) {
            if (await updatePassword(userId, newPassword)) {
                return true;
            }
        }
    }

    return false;
}

async function updatePassword(userId, password) {
    try {
        const pwHash = await bcrypt.hash(password, saltRounds);
        await db.passwords.updatePassword(userId, pwHash);
        return pwHash;
    }
    catch(e) {
       logger.error('an error occurred when setting the password');
       logger.error(e);
    }
    return null;
}

async function resetPassword(userId) {
    // if user exists, update the reset code then send an email
    const user = await db.users.getUser(userId);
    if (user) {
        const resetCode = Math.random().toString(36).substring(2, 15);
        await db.passwords.updateResetCode(userId, resetCode);
        // send the reset password email
        const resetLink = await authService.makeResetPasswordLink(userId, resetCode);
        return await emailService.sendResetPasswordEmail(userId, user.fname, resetLink);
    }
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
    const validationLink = validationService.makeValidationLink(userId, 
        validationService.generateValidationCode(userId));
    const user = await db.users.getUser(userId);

    return await emailService.sendValidationEmail(userId, user.fname, validationLink);
}

async function listUsers() {
    try {
        const users = await db.users.listUsers();
        return users;
    }
    catch(e) {
       logger.error(`an error occurred when getting a list of all the users`);
       logger.error(e);
    }
    return false;
}

async function updateUser() {

}

async function getUser(userId) {
    try {
        const user = await db.users.getUser(userId);
        return user;
    }
    catch(e) {
       logger.error(`an error occurred when retrieving ${userId} from the db`);
       logger.error(e);
    }
    return false;
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
        return user.id !== undefined;
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
                if (!(await userExists(user.email))) {
                    if (await register(user, user.password)) {
                        logger.info(`created user with username ${user.email}`);
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
    changePassword: changePassword,
    resetPassword: resetPassword,
    isUserValidated: isUserValidated,
    validateUser: validateUser,
    listUsers: listUsers,
    updateUser: updateUser,
    setupEmailValidation: setupEmailValidation,
    isAdmin: isAdmin,
    setupDefaultUsers: setupDefaultUsers,
    getUser: getUser
};
