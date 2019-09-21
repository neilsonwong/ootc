'use strict';

const logger = require('../logger');

async function sendValidationEmail(email, validationCode) {
    logger.info(`sending validation email to ${email}
    validation code is "${validationCode}"`);
}

module.exports = {
    sendValidationEmail: sendValidationEmail
};
