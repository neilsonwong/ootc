'use strict';

const config = require('../../config');
const db = require('../db/db');

// just use an internal object
const validationCodes = {};

async function isUserValidated(userId) {
    const user = await db.users.getUser(userId);
    return user.validated;
}

async function validateUser(userId, validationCode) {
    if (validationCode === validationCodes[userId]) {
        await db.users.validateUser(userId);
        delete validationCodes[userId];
        return true;
    }
    return false;
}

function generateValidationCode(userId) {
    const vCode = randomValidationCode();
    validationCodes[userId] = vCode;
    return vCode;
}

function randomValidationCode() {
    if (config.OVERRIDE_VALIDATION) {
        return config.OVERRIDE_VALIDATION;
    }
    return Math.floor(Math.random()*1000000);
}

module.exports = {
    isUserValidated: isUserValidated,
    validateUser: validateUser,
    generateValidationCode: generateValidationCode,
};
