'use strict';

const moment = require('moment');
const logger = require('../logger');

const yyyymmdd = /^(\d{4})-(\d{2})-(\d{2})$/;
const monthMaxDaysBase = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function strToDate(dateStr) {
    const match = yyyymmdd.exec(dateStr);
    if (match !== null) {
        match.shift(); // don't need the full match
        const [year, month, day] = match.map(e => parseInt(e));

        // check if valid date
        if (!isNaN(year) && !isNaN(month) && !isNaN(day) &&
            month >= 0 && month < 11 &&
            day > 0 && day <= monthMaxDays(month, year)) {
            return moment(dateStr, 'YYYY-MM-DD');
        }
    }
    
    logger.error('invalid date passed to strToDate');
    logger.error(dateStr);
    return null;
}

function monthMaxDays(month, year) {
    if (month === 2 && 
        year % 4 === 0) {
            return 28;
    }
    return monthMaxDaysBase[month - 1];
}

function getEndTimeString(startDate, startTime, duration) {
    const endDateTime = getDateTime(startDate, startTime).add(duration, 'minutes');
    return endDateTime.format('h:mm A');
}

function getStartTimeString(startDate, startTime) {
    const startDateTime = getDateTime(startDate, startTime);
    return startDateTime.format('h:mm A');
}

function getDateTime(startDate, startTime, offset) {
    const paddedStartTime = ('0' + startTime).slice(-5);
    const base = moment(`${startDate} ${paddedStartTime}`);
    if (offset) {
        const basePlus = base.add(offset, 'minutes');
        return basePlus;
    }
    return base;
}

module.exports = {
    strToDate: strToDate,
    getStartTimeString: getStartTimeString,
    getEndTimeString: getEndTimeString,
    getDateTime: getDateTime
};
