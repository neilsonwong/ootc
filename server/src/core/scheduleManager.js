'use strict';

const logger = require('../logger');
const db = require('../db/db');

async function getSchedule(year) {
    try {
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
        return await db.timeSlotDefs.insertTimeSlotDef(timeSlotDef);
    }
    catch(e) {
        logger.error(`there was an error inserting a timeSlotDef with id ${timeSlotDef.id}`);
        logger.error(timeSlotDef);
        logger.error(e);
        return null;
    }
}

async function deleteTimeSlotDef(timeSlotDefId) {
    try {
        return await db.timeSlotDefs.deleteTimeSlotDef(timeSlotDefId);
    }
    catch(e) {
        logger.error(`there was an error deleting timeSlotDef with id ${timeSlotDefId}`);
        logger.error(timeSlotDefId);
        logger.error(e);
        return null;
    }
}

async function updateTimeSlotDef(timeSlotDef) {
    try {
        return await db.timeSlotDefs.updateTimeSlotDef(timeSlotDef);
    }
    catch(e) {
        logger.error(`there was an error deleting timeSlotDef with id ${timeSlotDef.id}`);
        logger.error(timeSlotDef);
        logger.error(e);
        return null;
    }
}

async function generateTimeSlots(start, end) {
    // 
}

module.exports = {
    getSchedule: getSchedule,
    addTimeSlotDef: addTimeSlotDef,
    deleteTimeSlotDef: deleteTimeSlotDef,
    updateTimeSlotDef: updateTimeSlotDef,
    generateTimeSlots: generateTimeSlots,
};
