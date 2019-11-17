'use strict';

const cron = require('node-cron');
const moment = require('moment');
const logger = require('../logger');
const accountManager = require('../core/accountManager');
const reservationManager = require('../core/reservationManager');
const emailService = require('./emailService');

let weeklyJob;
let monthlyJob;

function startCron() {
    if (!weeklyJob) {
        // every 5am on tuesday
        weeklyJob = cron.schedule('0 5 * Jan,Feb,Mar Tuesday', () => {
            sendReminderEmailsForWeek();
        });
    }

    if (!monthlyJob) {
        // every 5am on tuesday
        monthlyJob = cron.schedule('0 5 1 Jan,Feb,Mar *', () => {
            sendMonthlyReminderEmail();
        });
    }
}

async function sendReminderEmailsForWeek() {
    // runs on tuesdays
    const startDate = moment();
    const endDate = moment(startDate).add(7, 'days');
    sendRemindersForDateRange(startDate, endDate);
}

function sendMonthlyReminderEmail() {
    // runs on 1st of the month
    const startDate = moment();
    const endDate = moment(startDate).endOf('month');
    sendRemindersForDateRange(startDate, endDate);
}

async function sendRemindersForDateRange(startDate, endDate) {
    let users;
    try {
        users = await accountManager.listUsers();
    }
    catch(e) {
        logger.error('an error occurred when getting all users');
        logger.error(e);
        return;
    }

    for (const user of users) {
        try {
            const reservations = await reservationManager.getReservationsForUser(user.id);

            if (reservations && reservations.length > 0) {
                const filtered = reservations.filter((reservation) => {
                    const resDate = moment(reservation.startDate, 'YYYY-MM-DD');
                    const between = resDate.isBetween(startDate, endDate, 'day', []);
                    // console.log(`${resDate.format('YYYY-MM-DD')} is ${between ? 'between' : 'not between'} ` +
                    //     `${startDate} - ${endDate}`);
                    return between;
                });

                if (filtered && filtered.length > 0) {
                    emailService.sendReminderEmail(user.email, user.fname,
                        startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'), filtered);
                }
            }
        }
        catch(e) {
            logger.error(`an error occurred when sending the reminder emails for ${user ? user.id : 'undefined user'}`);
            logger.error(e);
        }
    }
}

function test() {
    // tuesday
    let startDate = moment('2020-02-11');
    let endDate = moment(startDate).add(7, 'days');
    sendRemindersForDateRange(startDate, endDate);

    startDate = moment('2020-03-01');
    endDate = moment(startDate).endOf('month');
    sendRemindersForDateRange(startDate, endDate);
}

module.exports = {
    startCron: startCron,
    test: test
};
