'use strict';

const logger = require('../logger');
const db = require('../db/db');
const apiReqValidator = require('../util/apiRequestValidator');
const REPEAT_INTERVAL = require('../classes/RepeatIntervalEnum');
const TimeSlot = require('../models/TimeSlot');
const moment = require('moment');

async function getSchedule(year) {
    try {
        const err = apiReqValidator.isValidYear(year);
        if (err) {
            throw err;
        }
        return await db.timeSlotDefs.listTimeSlotDefsForYear(year);
    }
    catch(e) {
        logger.error(`there was an error retrieving the schedule for ${year}`);
        logger.error(e);
        return null;
    }
}

async function addTimeSlotDef(timeSlotDef) {
    try {
        const err = apiReqValidator.validateTimeSlotDefCreation(timeSlotDef);
        if (err) {
            throw err;
        }
        return await db.timeSlotDefs.insertTimeSlotDef(timeSlotDef);
    }
    catch(e) {
        logger.error(`there was an error inserting a timeSlotDef with id ${timeSlotDef}`);
        logger.error(e);
        return null;
    }
}

async function deleteTimeSlotDef(timeSlotDefId) {
    try {
        const err = apiReqValidator.validateTimeSlotDefId(timeSlotDefId);
        if (err) {
            throw err;
        }
        return await db.timeSlotDefs.deleteTimeSlotDef(timeSlotDefId);
    }
    catch(e) {
        logger.error(`there was an error deleting timeSlotDef with id ${timeSlotDefId}`);
        logger.error(e);
        return null;
    }
}

async function updateTimeSlotDef(timeSlotDef) {
    try {
        const err = apiReqValidator.validateTimeSlotDef(timeSlotDef);
        if (err) {
            throw err;
        }
        return await db.timeSlotDefs.updateTimeSlotDef(timeSlotDef);
    }
    catch(e) {
        logger.error(`there was an error deleting timeSlotDef with id ${timeSlotDef.id}`);
        logger.error(timeSlotDef);
        logger.error(e);
        return null;
    }
}

async function generateTimeSlots(timeSlotDef) {
    try {
        const err = apiReqValidator.validateTimeSlotDefCreation(timeSlotDef);
        if (err) {
            throw err;
        }

        const timeSlotsToInsert = [];
        // now that we have our start date, we can operate on the date object!
        let curDate = moment(timeSlotDef.repeatStartDate, 'YYYY-MM-DD');
        let daysGenerated = 0;
        const fnAdvanceDate = getAdvanceDateFunction(timeSlotDef.repeatInterval, timeSlotDef.repeatSkipEvery);

        while(daysGenerated < timeSlotDef.repeatCount) {
            // let's generate a day
            timeSlotsToInsert.push(new TimeSlot(undefined, curDate.format('YYYY-MM-DD'), 
                timeSlotDef.startTime, timeSlotDef.duration, timeSlotDef.department, 
                timeSlotDef.signUpCap, timeSlotDef.desc));

            curDate = fnAdvanceDate(curDate);
            daysGenerated++;
        }

        logger.info('timeslots objects created, generating now');

        const generated = await Promise.all(timeSlotsToInsert.map(timeSlot => db.timeSlots.insertTimeSlot(timeSlot)));

        logger.info('timeslots objects generated');
        return generated;
    }
    catch(e) {
        logger.error(`there was an error generating time slots using the timeSlotDef with id ${timeSlotDef.id}`);
        logger.error(timeSlotDef);
        logger.error(e);
        return null;
    }
}

// TODO: handle -1 skip option
function getAdvanceDateFunction(interval, skipOption) {
    return (date) => {
        switch(interval) {
            case REPEAT_INTERVAL.YEARLY:
                date.add(1 + skipOption, 'y');
                break;
            case REPEAT_INTERVAL.MONTHLY:
                date.add(1 + skipOption, 'M');
                break;
            case REPEAT_INTERVAL.WEEKLY:
                date.add(1 + skipOption, 'w');
                break;
            case REPEAT_INTERVAL.DAILY:
                date.add(1 + skipOption, 'd');
                break;
            case REPEAT_INTERVAL.YEARLY_X_WEEKDAY:      // 3rd friday of year
                const weekOfYear = date.week();
                const weekday = date.weekday();

                date.add(1 + skipOption, 'y');
                date.week(weekOfYear);
                date.weekday(weekday);
                break;
            case REPEAT_INTERVAL.MONTHLY_X_WEEKDAY:     // first monday of april
                const weekOfMonth = Math.floor(date.date() / 7); //zero indexed
                const weekday2 = date.weekday();

                // get start day of next month
                date.add(1 + skipOption, 'm');
                monthStart = date.startOf('month');

                // change month start into what we want
                monthStart.week(monthStart.week() + weekOfMonth);
                monthStart.weekday(weekday2);
                date = monthStart;
                break;
            default:
                logger.error('unknown repeat interval specified');
        }

        return date;
    };
}

async function getTimeSlotsForDept(dept, start, end) {
    try {
        const err = (apiReqValidator.validateDepartmentId(dept) || apiReqValidator.isValidYYYYMMDD(start) || apiReqValidator.isValidYYYYMMDD(end));
        if (err) {
            throw err;
        }
        return await db.timeSlots.listTimeSlotsForDept(dept, start, end);
    }
    catch(e) {
        logger.error(`there was an error getting time slots for ${dept}`);
        logger.error(e);
        return null;
    }
}

async function getTimeSlotsByTimeRange(start, end) {
    try {
        const err = (apiReqValidator.isValidYYYYMMDD(start) || apiReqValidator.isValidYYYYMMDD(end));
        if (err) {
            throw err;
        }
        return await db.timeSlots.listTimeSlotsByRange(start, end);
    }
    catch(e) {
        logger.error(`there was an error getting all time slots`);
        logger.error(e);
        return null;
    }
}

async function getReservationsForTimeSlot(timeSlotId) {
    try {
        const err = apiReqValidator.validateTimeSlotId(timeSlotId);
        if (err) {
            throw err;
        }
        return await db.reservations.getReservationsByTimeSlot(timeSlotId);
    }
    catch(e) {
        logger.error(`there was an error getting all time slots`);
        logger.error(e);
        return null;
    }
}

async function getTimeSlot(timeSlotId) {
    try {
        const err = apiReqValidator.validateTimeSlotId(timeSlotId);
        if (err) {
            throw err;
        }
        return await db.timeSlots.getTimeSlot(timeSlotId);
    }
    catch(e) {
        logger.error(`there was an retrieving the time slot`);
        logger.error(e);
        return null;
    }
}

async function updateTimeSlot(timeSlot) {
    try {
        const err = apiReqValidator.validateTimeSlot(timeSlot);
        if (err) {
            throw err;
        }
        return await db.timeSlots.updateTimeSlot(timeSlot);
    }
    catch(e) {
        logger.error(`there was an updating error the time slot`);
        logger.error(e);
        return null;
    }
}


module.exports = {
    getSchedule: getSchedule,
    addTimeSlotDef: addTimeSlotDef,
    deleteTimeSlotDef: deleteTimeSlotDef,
    updateTimeSlotDef: updateTimeSlotDef,
    generateTimeSlots: generateTimeSlots,
    getTimeSlotsForDept: getTimeSlotsForDept,
    getTimeSlotsByTimeRange: getTimeSlotsByTimeRange,
    getReservationsForTimeSlot: getReservationsForTimeSlot,
    getTimeSlot: getTimeSlot,
    updateTimeSlot: updateTimeSlot
};
