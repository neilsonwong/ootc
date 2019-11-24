'use strict';

const db = require('../sqliteWrapper');
const DbModule = require('./dbModule');
const TimeSlot = require('../../models/TimeSlot');
const TimeSlotView = require('../../classes/TimeSlotView');

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS timeSlots (
            id INTEGER PRIMARY KEY,
            startDate TEXT NOT NULL,
            startTime TEXT NOT NULL,
            duration INTEGER NOT NULL,
            department INTEGER NOT NULL,
            signUpCap INTEGER NOT NULL,
            desc TEXT NOT NULL,
            FOREIGN KEY(department) REFERENCES departments(id)
        )`,

    getTimeSlot:
        `SELECT timeSlots.id, startDate, startTime, duration, departments.id as departmentId, departments.name AS department, signUpCap, desc, count(reservations.id) as reserved
        FROM timeSlots INNER JOIN departments ON timeSlots.department = departments.id
        LEFT JOIN reservations ON timeslots.id = reservations.timeSlot
        WHERE timeSlots.id = ? 
        GROUP BY timeSlots.id`,
    
    listTimeSlots:
        `SELECT * FROM timeSlots`,

    listTimeSlotsByRange:
        `SELECT timeSlots.id, startDate, startTime, duration, departments.id as departmentId, departments.name AS department, signUpCap, desc, count(reservations.id) as reserved
        FROM timeSlots INNER JOIN departments ON timeSlots.department = departments.id
        LEFT JOIN reservations ON timeslots.id = reservations.timeSlot
        WHERE startDate >= ? AND startDate <= ?
        GROUP BY timeSlots.id`,
    
    listTimeSlotsForDept:
        `SELECT timeSlots.id, startDate, startTime, duration, departments.id as departmentId, departments.name AS department, signUpCap, desc, count(reservations.id) as reserved
        FROM timeSlots INNER JOIN departments ON timeSlots.department = departments.id
        LEFT JOIN reservations ON timeslots.id = reservations.timeSlot
        WHERE departments.id = ? AND startDate >= ? AND startDate <= ?
        GROUP BY timeSlots.id`,

    updateTimeSlot:
        `UPDATE timeSlots SET
            startDate = $startDate,
            startTime = $startTime,
            duration = $duration,
            department = $department,
            signUpCap = $signUpCap,
            desc = $desc
        WHERE id = $id`,

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

    async getTimeSlot(timeSlotId) {
        const timeSlot = await db.get(sql.getTimeSlot, [timeSlotId]);
        return this.fixType(timeSlot);
    }

    async listTimeSlots() {
        const rows = await db.all(sql.listTimeSlots);
        return rows.map(e => this.fixType(e));
    }

    async listTimeSlotsByRange(start, end) {
        const rows = await db.all(sql.listTimeSlotsByRange, [start, end]);
        return rows.map(e => this.fixType(e));
    }

    async listTimeSlotsForDept(dept, start, end) {
        const rows = await db.all(sql.listTimeSlotsForDept, [dept, start, end]);
        return rows.map(e => this.fixType(e, TimeSlotView));
    }

    async insertTimeSlot(timeSlot) {
        timeSlot = this.fixType(timeSlot);
        const { lastID } = await db.run(sql.insertTimeSlot, timeSlot.prepare(sql.insertTimeSlot));
        if (lastID) {
            timeSlot.id = lastID;
            return timeSlot;
        }
    }

    async updateTimeSlot(timeSlot) {
        timeSlot = this.fixType(timeSlot);
        return await db.run(sql.updateTimeSlot, timeSlot.prepare(sql.updateTimeSlot));
    }

    async deleteTimeSlot(timeSlotId) {
        return await db.run(sql.deleteTimeSlot, [timeSlotId]);
    }
}

module.exports = new TimeSlotDbModule();
