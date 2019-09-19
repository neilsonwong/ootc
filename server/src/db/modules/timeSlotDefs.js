'use strict';

const db = require('../sqliteWrapper');
const DbModule = require('./dbModule');
const TimeSlotDefinition = require('../../models/TimeSlotDefinition');

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS timeSlotDefs (
            id INTEGER PRIMARY KEY,
            dayOfWeek INTEGER,
            startTime  INTEGER,
            duration INTEGER,
            department INTEGER,
            signUpCap INTEGER,
            year INTEGER
        )`,
    listTimeSlotDefsForYear:
        `SELECT * FROM timeSlotDefs WHERE year = ?`,

    insertTimeSlotDef: 
        `INSERT INTO timeSlotDefs (dayOfWeek, startTime, duration, department, signupCap, year)
        VALUES($dayOfWeek, $startTime, $duration, $department, $signUpCap, $year)`,
    
    updateTimeSlotDef:
        `UPDATE timeSlotDefs SET
            dayOfWeek = $dayOfWeek,
            startTime = $startTime,
            department = $department,
            signUpCap = $signUpCap,
            year = $year
        WHERE id = $id`,
    
    deleteTimeSlotDef:
        `DELETE FROM timeSlotDefs WHERE id = ?`
};

class TimeSlotDefDbModule extends DbModule {
    constructor() {
        super('timeSlotDefs', sql.createTable);
    }

    async listTimeSlotDefsForYear(year) {
        const rows = await db.all(sql.listTimeSlotDefsForYear, [year]);
        return rows.map(e => Object.assign(new TimeSlotDefinition(), e));
    }

    async insertTimeSlotDef(timeSlotDef) {
        return await db.run(sql.insertTimeSlotDef, timeSlotDef.prepare(sql.insertTimeSlotDef));
    }

    async updateTimeSlotDef(timeSlotDef) {
        return await db.run(sql.updateTimeSlotDef, timeSlotDef.prepare(sql.updateTimeSlotDef));
    }

    async deleteTimeSlotDef(timeSlotDefId) {
        return await db.run(sql.deleteTimeSlotDef, [timeSlotDefId]);
    }
}

module.exports = new TimeSlotDefDbModule();
