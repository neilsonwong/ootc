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
        super('reservations', sql.createTable);
    }

    async getReservationsByUserId(userId) {
        const rows = await db.all(sql.getReservationsByUserId, [userId]);
        return rows.map(e => Object.assign(new Reservation(), e));
    }

    async getReservationsByTimeSlot(timeSlotId) {
        const rows = await db.all(sql.getReservationsByTimeSlot, [timeSlotId]);
        return rows.map(e => Object.assign(new Reservation(), e));
    }

    async insertReservation(reservation) {
        console.log(reservation.prepare(sql.insertReservation))
        return await db.run(sql.insertReservation, reservation.prepare(sql.insertReservation));
    }

    async updateReservationAttendance(reservationId, attended) {
        return await db.run(sql.updateReservationAttendance, [attended, reservationId]);
    }

    async deleteReservation(reservationId) {
        return await db.run(sql.deleteReservation, [reservationId]);
    }
}

module.exports = new ReservationDbModule();
