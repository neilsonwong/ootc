'use strict';

const db = require('../sqliteWrapper');
const DbModule = require('./dbModule');
const Reservation  = require('../../models/Reservation');

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY,
            user INTEGER,
            timeSlot INTEGER,
            attended INTEGER
        )`,

    getReservationsByUserId:
        `SELECT * FROM reservations WHERE user = ?`,

    getReservationsByTimeSlot:
        `SELECT * FROM reservations WHERE timeSlot = ?`,
    
    findReservationByUserAndTime:
        `SELECT reservations.id,
            reservations.user,
            reservations.timeSlot,
            reservations.attended
        FROM reservations INNER JOIN timeSlots ON 
            reservations.timeSlot = timeSlots.id
            INNER JOIN timeSlotDefs ON
            timeSlots.timeSlotDef = timeSlotDefs.id
        WHERE 
            reservations.user = ? AND
            timeSlots.datetime
                BETWEEN ? AND (? + timeSlotDefs.duration)`,

    insertReservation: 
        `INSERT INTO reservations (user, timeSlot, attended)
        VALUES($user, $timeSlot, $attended)`,
    
    updateReservationAttendance:
        `UPDATE reservations 
        SET attended = ? 
        WHERE id = ?`,

    deleteReservation:
        `DELETE FROM reservations 
        WHERE id = ?`,
};

class ReservationDbModule extends DbModule {
    constructor() {
        super('reservations', sql.createTable, Reservation);
    }

    async getReservationsByUserId(userId) {
        const rows = await db.all(sql.getReservationsByUserId, [userId]);
        return rows.map(e => this.fixType(e));
    }

    async getReservationsByTimeSlot(timeSlotId) {
        const rows = await db.all(sql.getReservationsByTimeSlot, [timeSlotId]);
        return rows.map(e => this.fixType(e));
    }

    async insertReservation(reservation) {
        reservation = this.fixType(reservation);
        const { lastID } = await db.run(sql.insertReservation,
            reservation.prepare(sql.insertReservation));
        if (lastID) {
            reservation.id = lastID;            
            return reservation;
        }
        return null;
    }

    async findReservationByUserAndTime(userId, time) {
        return this.fixType(await db.get(sql.findReservationByUserAndTime,
            [userId, time, time]));
    }

    async updateReservationAttendance(reservationId, attended) {
        return await db.run(sql.updateReservationAttendance, [attended, reservationId]);
    }

    async deleteReservation(reservationId) {
        return await db.run(sql.deleteReservation, [reservationId]);
    }
}

module.exports = new ReservationDbModule();
