'use strict';

const querystring = require('querystring');
const db = require('../db/db');
const config = require('../../config');

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
    return Math.floor(Math.random()*1000000);
}

function makeValidationLink(email, code) {
    const qs = querystring.stringify({
        code: Buffer.from(`${email}:${code}`).toString('base64')
    });

    return `${config.LINKS.VALIDATE_EMAIL}?${qs}`;
}

module.exports = {
    isUserValidated: isUserValidated,
    validateUser: validateUser,
    generateValidationCode: generateValidationCode,
    makeValidationLink: makeValidationLink,
};
