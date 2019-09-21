'use strict';

const db = require('../sqliteWrapper');
const DbModule = require('./dbModule');
const TimeSlotDefinition = require('../../models/TimeSlotDefinition');

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS timeSlotDefs (
            id INTEGER PRIMARY KEY,
            startTime TEXT NOT NULL,
            duration INTEGER NOT NULL,
            department INTEGER NOT NULL,
            signUpCap INTEGER NOT NULL,
            repeatStartDate TEXT NOT NULL,
            repeatCount INTEGER NOT NULL,
            repeatInterval INTEGER NOT NULL,
            repeatSkipEvery INTEGER NOT NULL
        )`,
    listTimeSlotDefsForYear:
        `SELECT * FROM timeSlotDefs WHERE repeatStartDate >= ? AND repeatStartDate <= ?`,

    insertTimeSlotDef: 
        `INSERT INTO timeSlotDefs (startTime, duration, department, signupCap, repeatStartDate, repeatCount, repeatInterval, repeatSkipEvery)
        VALUES($startTime, $duration, $department, $signUpCap, $repeatStartDate, $repeatCount, $repeatInterval, $repeatSkipEvery)`,
    
    updateTimeSlotDef:
        `UPDATE timeSlotDefs SET
            startTime = $startTime,
            duration = $duration,
            department = $department,
            signUpCap = $signUpCap,
            repeatStartDate = $repeatStartDate,
            repeatCount = $repeatCount,
            repeatInterval = $repeatInterval,
            repeatSkipEvery = $repeatSkipEvery
        WHERE id = $id`,
    
    deleteTimeSlotDef:
        `DELETE FROM timeSlotDefs WHERE id = ?`
};

class TimeSlotDefDbModule extends DbModule {
    constructor() {
        super('timeSlotDefs', sql.createTable, TimeSlotDefinition);
    }

    async listTimeSlotDefsForYear(year) {
        const yearStart = `${year}-01-01`;
        const yearEnd = `${year}-12-31`;
        const rows = await db.all(sql.listTimeSlotDefsForYear, [yearStart, yearEnd]);
        return rows.map(e => this.fixType(e));
    }

    async insertTimeSlotDef(timeSlotDef) {
        timeSlotDef = this.fixType(timeSlotDef);
        const { lastID } = await db.run(sql.insertTimeSlotDef,
            timeSlotDef.prepare(sql.insertTimeSlotDef));
        if (lastID) {
            timeSlotDef.id = lastID;
            return timeSlotDef;
        }
    }

    async updateTimeSlotDef(timeSlotDef) {
        timeSlotDef = this.fixType(timeSlotDef);
        return await db.run(sql.updateTimeSlotDef, timeSlotDef.prepare(sql.updateTimeSlotDef));
    }

    async deleteTimeSlotDef(timeSlotDefId) {
        return await db.run(sql.deleteTimeSlotDef, [timeSlotDefId]);
    }
}

module.exports = new TimeSlotDefDbModule();
