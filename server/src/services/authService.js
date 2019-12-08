'use strict';

const logger = require('../logger');
const jwt = require('jsonwebtoken');
const db = require('../db/db');
const bcrypt = require('bcrypt');
const config = require('../../config');
const querystring = require('querystring');

async function authenticate(userId, password) {
    if (await isValidUser(userId, password)) {
        return newToken(userId);
    }
    return undefined;
}

async function refresh(userId, token) {
    let payload;

    if (!token) {
        logger.warn('Unable to refresh jwt token: no jwt token provided');
        return undefined;
    }

    try {
        payload = jwt.verify(token, config.JWT.SECRET)
    } catch (e) {
        /*
        if (e instanceof jwt.JsonWebTokenError) {
            return res.status(401).end()
        }
        return res.status(400).end()
        */
        logger.warn('Unable to refresh jwt token: token verification failed');
        return undefined;
    }

    const nowUnixSeconds = Math.round(Number(new Date()) / 1000)
    if (payload.exp - nowUnixSeconds > 60) {
        logger.warn('Unable to refresh jwt token: too early to refresh');
        return undefined;
    }
    else {
        // Now, create a new token for the current user, with a renewed expiration time
        return newToken(userId);
    }
}

async function isValidAdmin(userId) {
    const user = await db.users.getUser(userId);
    if (user.admin) {
        logger.debug(`validated ${userId} is admin`);
        return true;
    }
    logger.debug(`${userId} is NOT admin`);
    return false;
}

async function isValidUser(userId, password) {
    const pwHash = await db.passwords.getPassword(userId) || '';
    try {
        if (await bcrypt.compare(password, pwHash)) {
            return true;
        }
    }
    catch (e) {
        logger.error(`an error occured when validating user: ${userId}`);
        logger.error(e);
    }
    return false;
}

function newToken(userId) {
    return { 
        token: jwt.sign({ sub: userId }, config.JWT.SECRET, {
            expiresIn: config.JWT.EXPIRY_TIME
        }),
        expiry: (Date.now() + config.JWT.EXPIRY_TIME * 1000)
    };
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

function makeResetPasswordLink(email, code) {
    const qs = querystring.stringify({
        code: Buffer.from(`${email}:${code}`).toString('base64')
    });

    return `${config.LINKS.RESET_PASSWORD}?${qs}`;
}

module.exports = {
    refresh: refresh,
    authenticate: authenticate,
    isValidAdmin: isValidAdmin,
    isValidUser: isValidUser,
    isValidAdminWithCb: isValidAdminWithCb,
    isValidUserWithCb: isValidUserWithCb,
    makeResetPasswordLink: makeResetPasswordLink
};
