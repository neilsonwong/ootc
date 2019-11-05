'use strict';

const config = require('../../config');
const nodemailer = require('nodemailer');
const aws = require('aws-sdk');
const logger = require('../logger');
const Email = require('../classes/Email');
const emailTemplates = require('../util/emailTemplates');

const awsCred = './aws.json';
let transporter;

function init() {
    try {
        // configure AWS SDK
        aws.config.loadFromPath(awsCred);

        // create Nodemailer SES transporter
        transporter = nodemailer.createTransport({
            SES: new aws.SES({
                apiVersion: '2010-12-01'
            }),
            sendingRate: config.EMAIL.MAX_CONCURRENT
        });
    }
    catch(e) {
        if (e.code === 'ENOENT' && e.path.indexOf(awsCred) !== -1) {
            logger.error('aws credentials not present. Unable to initialize email service');
        }
        else {
            logger.error('unable to initialize email service');
            logger.error(e);
        }
    }
}

function sendMail(email) {
    if (transporter) {
        return new Promise((res, rej) => {
            transporter.sendMail(email, (err, info) => {
                if (err) {
                    return rej(err);
                }
                else {
                    logger.info(info);
                    return res();
                }
            });
        });
    }
    else {
        logger.debug('no email transporter available');
    }
}

async function sendValidationEmail(userEmail, name, validationLink) {
    logger.info(`sending validation email to ${userEmail}
    validation link is "${validationLink}"`);

    const email = new Email(config.EMAIL.MASTER, userEmail,
        emailTemplates.VERIFICATION.subject(), '', {
            text: emailTemplates.VERIFICATION.text(name, validationLink)
        });
    
    try {
        return await sendMail(email);
    }
    catch(err) {
        logger.error('There was an error when sending the email');
        logger.error(err);
    }
}

async function sendResetPasswordEmail(userEmail, name, resetLink) {
    logger.info(`sending reset password email to ${userEmail}
    reset link is "${resetLink}"`);

    const email = new Email(config.EMAIL.MASTER, userEmail,
        emailTemplates.RESET_PASSWORD.subject(), '', {
            text: emailTemplates.RESET_PASSWORD.text(name, resetLink)
        });
    
    try {
        return await sendMail(email);
    }
    catch(err) {
        logger.error('There was an error when sending the email');
        logger.error(err);
    }
}

module.exports = {
    init: init,
    sendValidationEmail: sendValidationEmail,
    sendResetPasswordEmail: sendResetPasswordEmail,
};
