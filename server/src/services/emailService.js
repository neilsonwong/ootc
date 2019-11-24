'use strict';

const config = require('../../config');
const nodemailer = require('nodemailer');
const aws = require('aws-sdk');
const logger = require('../logger');
const Email = require('../classes/Email');
const emailTemplates = require('../util/emailTemplates');

const awsCred = './aws.json';

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        if (!email || !emailRegex.test(email.to)) {
            logger.info(`attempt to send to invalid email: ${email ? email.to : ''}`);
        }
        else {
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
    }
    else {
        logger.info('no email transporter available');
        logger.info(email.subject);
        logger.info(email.text);
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

async function sendReminderEmail(userEmail, name, startDate, endDate, reservations) {
    logger.info(`sending weekly reminder email to ${userEmail}`);

    const email = new Email(config.EMAIL.MASTER, userEmail,
        emailTemplates.REMINDER.subject(startDate, endDate), '', {
            text: emailTemplates.REMINDER.text(name, reservations)
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
    sendReminderEmail: sendReminderEmail,
};
