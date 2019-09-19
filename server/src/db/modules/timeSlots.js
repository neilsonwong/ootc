'use strict';

const db = require('../sqliteWrapper');
const DbModule = require('./dbModule');
const TimeSlot = require('../../models/TimeSlot');

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

class TimeSlotDbModule extends DbModule {
    constructor() {
        super('timeSlots', sql.createTable);
    }

    async listTimeSlots() {
        const rows = await db.all(sql.listTimeSlots);
        return rows.map(e => Object.assign(new TimeSlot(), e));
    }

    async listTimeSlotsByRange(start, end) {
        const rows = await db.all(sql.listTimeSlotsByRange, [start, end]);
        return rows.map(e => Object.assign(new TimeSlot(), e));
    }

    async insertTimeSlot(timeSlot) {
        return await db.run(sql.insertTimeSlot, timeSlot.prepare());
    }

    async deleteTimeSlot(timeSlotId) {
        return await db.run(sql.deleteTimeSlot, [timeSlotId]);
    }
}

module.exports = new TimeSlotDbModule();
