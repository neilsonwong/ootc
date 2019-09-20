'use strict';

const db = require('../sqliteWrapper');
const DbModule = require('./dbModule');
const TimeSlot = require('../../models/TimeSlot');

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS timeSlots (
            id INTEGER PRIMARY KEY,
            datetime INTEGER,
            timeSlotDef INTEGER,
            dayOfWeek INTEGER,
            startTime  INTEGER,
            duration INTEGER,
            department INTEGER,
            signUpCap INTEGER,
            year INTEGER
        )`,
    
    listTimeSlots:
        `SELECT * FROM timeSlots`,

    listTimeSlotsByRange:
        `SELECT * FROM timeSlots WHERE datetime BETWEEN ? AND ?`,

    insertTimeSlot:
        `INSERT INTO timeSlots (datetime, timeSlotDef)
        VALUES($datetime, $timeSlotDef)`,
    
    archiveTimeSlot:
        // careful this one is complicated!!
        `WITH defs AS 
            (SELECT dayOfWeek, startTime, duration, department, signUpCap, year FROM timeSlotDefs 
                WHERE id=(SELECT timeSlotDef FROM timeSlots WHERE id = ?))
        UPDATE timeSlots SET
            dayOfWeek = (SELECT dayOfWeek FROM defs),
            startTime = (SELECT startTime FROM defs),
            duration = (SELECT duration FROM defs),
            department = (SELECT department FROM defs),
            signUpCap = (SELECT signUpCap FROM defs),
            year = (SELECT year FROM defs)
        WHERE id = ?`,

    deleteTimeSlot:
        `DELETE FROM timeSlots WHERE id = ?`
};

class TimeSlotDbModule extends DbModule {
    constructor() {
        super('timeSlots', sql.createTable, TimeSlot);
    }

    async listTimeSlots() {
        const rows = await db.all(sql.listTimeSlots);
        return rows.map(e => this.fixType(e));
    }

    async listTimeSlotsByRange(start, end) {
        const rows = await db.all(sql.listTimeSlotsByRange, [start, end]);
        return rows.map(e => this.fixType(e));
    }

    async insertTimeSlot(timeSlot) {
        timeSlot = this.fixType(timeSlot);
        const { lastID } = await db.run(sql.insertTimeSlot, timeSlot.prepare(sql.insertTimeSlot));
        if (lastID) {
            timeSlot.id = lastID;
            return timeSlot;
        }
    }

    async archiveTimeSlot(timeSlotId) {
        return await db.run(sql.archiveTimeSlot, [timeSlotId, timeSlotId]);
    }

    async deleteTimeSlot(timeSlotId) {
        return await db.run(sql.deleteTimeSlot, [timeSlotId]);
    }
}

module.exports = new TimeSlotDbModule();
