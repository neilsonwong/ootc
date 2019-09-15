'use strict';

const db = require('../services/dbService');
const logger = require('../logger');

async function register(user) {
    try {
        if (await db.getUser(user.email) === null) {
            // user does not exist
            if (await db.insertUser(user)) {
                logger.verbose(`inserted user with email ${user.email}`);
            }
            else {
                logger.error(`was not able to insert user into db ${user.email}`);
            }
        }
        else {
            logger.verbose(`user with email: ${user.email} has already registered`);
        }
    }
    catch(e) {
        logger.error(`an error occured when inserting user, email: ${user.email}`);
    }
}

async function ban(user) {
    console.log('TO BE IMPLEMENTED');
}

module.exports = {
    register: register,
}
