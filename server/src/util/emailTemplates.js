'use strict';

const fs = require('fs');
const dateUtil = require('./dateUtil');

const TEMPLATES = loadTemplates();

function loadTemplates() {
    const reminder = fs.readFileSync('./src/emailTemplates/reminder.template', 'utf-8');
    const signUpConfirmation = fs.readFileSync('./src/emailTemplates/signupConfirmation.template', 'utf-8');
    const verification = fs.readFileSync('./src/emailTemplates/verification.template', 'utf-8');
    const resetPassword = fs.readFileSync('./src/emailTemplates/resetPassword.template', 'utf-8');

    return {
        VERIFICATION: {
            subject: () => ('OOTC - Email Verification'),
            text: generateVerificationEmail.bind(null, verification)
        },
        REMINDER: {
            subject: (start, end) => (`OOTC - REMINDER: ${start} - ${end}`),
            text: generateReminderEmail.bind(null, reminder)
        },
        SCHEDULE: {
            subject: () => 'OOTC - Schedule Confirmation',
            text: generateScheduleEmail.bind(null, signUpConfirmation)
        },
        RESET_PASSWORD: {
            subject: () => ('OOTC - Reset Password'),
            text: generateResetPasswordEmail.bind(null, resetPassword)
        }
    };
}

function generateVerificationEmail(template, name, link) {
    return template
        .replace(/%NAME%/g, name)
        .replace(/%LINK%/g, link);
}

function generateReminderEmail(template, name, reservations) {
    let reservationsString = reservations.map(r => (
        `${r.department}: ${r.startDate} ${dateUtil.getStartTimeString(r.startDate, r.startTime)} - ${dateUtil.getEndTimeString(r.startDate, r.startTime, r.duration)}`
    )).join('\n');

    return template
        .replace(/%NAME%/g, name)
        .replace(/%RESERVATIONS%/g, reservationsString);
}

function generateScheduleEmail(template, name, reservations) {
    const curYear = (new Date()).getFullYear();

    // reservations should be an array of ReservationView
    const reservationsString = reservations.map(reservation => {
        return `${reservation.department} ${reservation.startDate} ${reservation.startTime}: ${reservation.desc}`;
    }).join('\n');

    return template
        .replace(/%NAME%/g, name)
        .replace(/%YEAR%/g, curYear)
        .replace(/%RESERVATIONS%/g, reservationsString);
}

function generateResetPasswordEmail(template, name, link) {
    return template
        .replace(/%NAME%/g, name)
        .replace(/%LINK%/g, link);
}

module.exports = TEMPLATES;
