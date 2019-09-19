'use strict';

const db = require('./sqliteWrapper');
const TimeSlotDefinition = require('../models/TimeSlotDefinition');

async function createTable() {
    return await db.run(sql.createTable);
}

async function listTimeSlotDefsForYear(year) {
    const rows = await db.all(sql.listTimeSlotDefsForYear, [year]);
    return rows.map(e => Object.assign(new TimeSlotDefinition(), e));
}

async function insertTimeSlotDef(timeSlotDef) {
    return await db.run(sql.insertTimeSlotDef, timeSlotDef.prepare(sql.insertTimeSlotDef));
}

async function updateTimeSlotDef(timeSlotDef) {
    console.log(timeSlotDef.prepare());
    return await db.run(sql.updateTimeSlotDef, timeSlotDef.prepare(sql.updateTimeSlotDef));
}

async function deleteTimeSlotDef(timeSlotDefId) {
    return await db.run(sql.deleteTimeSlotDef, [timeSlotDefId]);
}

module.exports = {
    name: 'timeSlotDefs',
    createTable: createTable,
    listTimeSlotDefsForYear: listTimeSlotDefsForYear,
    insertTimeSlotDef: insertTimeSlotDef,
    updateTimeSlotDef: updateTimeSlotDef,
    deleteTimeSlotDef: deleteTimeSlotDef,
};

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
