'use strict';

const db = require('../sqliteWrapper');
const DbModule = require('./dbModule');
const TimeSlot = require('../../models/TimeSlot');

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS timeSlots (
            id INTEGER PRIMARY KEY,
            startDate TEXT NOT NULL,
            startTime TEXT NOT NULL,
            duration INTEGER NOT NULL,
            department INTEGER NOT NULL,
            signUpCap INTEGER NOT NULL,
            desc TEXT NOT NULL
        )`,
    
    listTimeSlots:
        `SELECT * FROM timeSlots`,

    listTimeSlotsByRange:
        `SELECT * FROM timeSlots WHERE startDate >= ? AND startDate <= ?`,

    insertTimeSlot:
        `INSERT INTO timeSlots (startDate, startTime, duration, department, signUpCap, desc)
        VALUES($startDate, $startTime, $duration, $department, $signUpCap, $desc)`,

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

    async deleteTimeSlot(timeSlotId) {
        return await db.run(sql.deleteTimeSlot, [timeSlotId]);
    }
}

module.exports = new TimeSlotDbModule();
