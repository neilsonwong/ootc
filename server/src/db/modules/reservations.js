'use strict';

const db = require('../sqliteWrapper');
const DbModule = require('./dbModule');
const Reservation  = require('../../models/Reservation');
const ReservationView  = require('../../classes/ReservationView');

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS reservations (
            id INTEGER PRIMARY KEY,
            user TEXT NOT NULL,
            timeSlot INTEGER NOT NULL,
            attended BOOLEAN NOT NULL,
            UNIQUE(user, timeSlot),
            FOREIGN KEY(user) REFERENCES users(id),
            FOREIGN KEY(timeSlot) REFERENCES timeSlots(id)
        )`,

    getReservationsByUserId:
        `SELECT reservations.id, reservations.user, timeSlots.id as timeSlotId, timeSlots.startDate, timeSlots.startTime, timeSlots.duration, departments.name AS department, timeSlots.desc
        FROM reservations
        INNER JOIN timeSlots ON reservations.timeSlot = timeSlots.id
        INNER JOIN departments ON departments.id = timeSlots.department
        WHERE user = ?
        ORDER BY timeSlots.startDate, timeSlots.startTime`,

    getReservationsByTimeSlot:
        `SELECT * FROM reservations
        WHERE timeSlot = ?`,
    
    getReservationsForUserOnDate:
        `SELECT reservations.id, reservations.user, timeSlots.id as timeSlotId, timeSlots.startDate, timeSlots.startTime, timeSlots.duration, departments.name AS department, timeSlots.desc
        FROM reservations
        INNER JOIN timeSlots ON reservations.timeSlot = timeSlots.id
        INNER JOIN departments ON departments.id = timeSlots.department
        WHERE 
            reservations.user = ? AND
            timeSlots.startDate = ?
        ORDER BY timeSlots.startTime`,

    insertReservation: 
        // `INSERT INTO reservations (user, timeSlot, attended)
        // VALUES($user, $timeSlot, $attended)`,
        `INSERT INTO reservations (user, timeSlot, attended)
        VALUES(
        $user, 
        (select id from (
            select timeSlots.id, timeSlots.signUpCap, count(reservations.id) 
            AS reserved FROM timeSlots LEFT JOIN reservations on timeSlots.id = reservations.timeSlot
            WHERE timeSlots.id = $timeSlot
        ) WHERE reserved < signUpCap),
        $attended)`,
    
    updateReservationAttendance:
        `UPDATE reservations 
        SET attended = ? 
        WHERE id = ?`,

    cancelReservation:
        `DELETE FROM reservations 
        WHERE id = ? AND user = ?`,

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
        return rows.map(e => this.fixType(e, ReservationView));
    }

    async getReservationsByTimeSlot(timeSlotId) {
        const rows = await db.all(sql.getReservationsByTimeSlot, [timeSlotId]);
        // don't fix to ReservationView as most of it is duplicate data
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

    async getReservationsForUserOnDate(userId, date) {
        const rows = await db.all(sql.getReservationsForUserOnDate, [userId, date]);
        return rows.map(e => this.fixType(e, ReservationView));
    }

    async updateReservationAttendance(reservationId, attended) {
        return await db.run(sql.updateReservationAttendance, [attended, reservationId]);
    }

    async cancelReservation(reservationId, userId) {
        return await db.run(sql.cancelReservation, [reservationId, userId]);
    }

    async deleteReservation(reservationId) {
        return await db.run(sql.deleteReservation, [reservationId]);
    }
}

module.exports = new ReservationDbModule();
