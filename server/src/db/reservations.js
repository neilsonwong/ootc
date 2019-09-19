'use strict';

const db = require('./sqliteWrapper');
const Reservation  = require('../models/Reservation');

async function createTable() {
    return await db.run(sql.createTable);
}

async function getReservationsByUserId(userId) {
    const rows = await db.all(sql.getReservationsByUserId, [userId]);
    return rows.map(e => Object.assign(new Reservation(), e));
}

async function getReservationsByTimeSlot(timeSlotId) {
    const rows = await db.all(sql.getReservationsByTimeSlot, [timeSlotId]);
    return rows.map(e => Object.assign(new Reservation(), e));
}

async function insertReservation(reservation) {
    console.log(reservation.prepare(sql.insertReservation))
    return await db.run(sql.insertReservation, reservation.prepare(sql.insertReservation));
}

async function updateReservationAttendance(reservationId, attended) {
    return await db.run(sql.updateReservationAttendance, [attended, reservationId]);
}

async function deleteReservation(reservationId) {
    return await db.run(sql.deleteReservation, [reservationId]);
}

module.exports = {
    name: 'reservations',
    createTable: createTable,
    getReservationsByUserId: getReservationsByUserId,
    getReservationsByTimeSlot: getReservationsByTimeSlot,
    insertReservation: insertReservation,
    updateReservationAttendance: updateReservationAttendance,
    deleteReservation: deleteReservation,
};

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
