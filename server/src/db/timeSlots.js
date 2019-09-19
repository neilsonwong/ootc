'use strict';

const db = require('./sqliteWrapper');
const TimeSlot = require('../models/TimeSlot');

async function createTable() {
    return await db.run(sql.createTable);
}

async function listTimeSlots() {
    const rows = await db.all(sql.listTimeSlots);
    return rows.map(e => Object.assign(new TimeSlot(), e));
}

async function listTimeSlotsByRange(start, end) {
    const rows = await db.all(sql.listTimeSlotsByRange, [start, end]);
    return rows.map(e => Object.assign(new TimeSlot(), e));
}

async function insertTimeSlot(timeSlot) {
    return await db.run(sql.insertTimeSlot, timeSlot.prepare());
}

async function deleteTimeSlot(timeSlotId) {
    return await db.run(sql.deleteTimeSlot, [timeSlotId]);
}

module.exports = {
    name: 'timeSlots',
    createTable: createTable,
    listTimeSlots: listTimeSlots,
    listTimeSlotsByRange: listTimeSlotsByRange,
    insertTimeSlot: insertTimeSlot,
    deleteTimeSlot: deleteTimeSlot,
};

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS timeSlots (
            id INTEGER PRIMARY KEY,
            datetime INTGER,
            timeSlotDef INTEGER
        )`,
    
    listTimeSlots:
        `SELECT * FROM timeSlots`,

    listTimeSlotsByRange:
        `SELECT * FROM timeSlots WHERE datetime BETWEEN ? AND ?`,

    insertTimeSlot:
        `INSERT INTO timeSlots (datetime, timeSlotDef)
        VALUES($datetime, $timeSlotDef)`,
    
    deleteTimeSlot:
        `DELETE FROM timeSlots WHERE id = ?`
};
