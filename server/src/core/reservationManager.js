'use strict';

const moment = require('moment');

const db = require('../db/db');
const logger = require('../logger');

// create
async function createReservation(reservation) {
    try {
        reservation.attended = false;
        return await db.reservations.insertReservation(reservation);
    }
    catch(e) {
        logger.error(`there was an error inserting the reservation`);
        logger.error(e);
        return null;
    }
}

// delete
async function cancelReservation(reservationId, userId) {
    try {
        return await db.reservations.cancelReservation(reservationId, userId);
    }
    catch(e) {
        logger.error(`there was an error deleting the reservation with id: ${reservationId}`);
        logger.error(e);
        return null;
    }
}

async function getReservationsForUser(userId) {
    try {
        return await db.reservations.getReservationsByUserId(userId);
    }
    catch(e) {
        logger.error(`there was an error retrieving the reservations for ${userId}`);
        logger.error(e);
        return null;
    }
}

// sign in
async function updateAttendance(userId, overrideDate) {
    // check whether there is a sign in for the time
    const now = overrideDate || moment().format("YYYY-MM-DD");
    const reservations = await db.reservations.getReservationsForUserOnDate(userId, now);
    console.log(reservations)
    if (reservations && reservations.length > 0) {
        return Promise.all(reservations.map(async (reservation) => {
            await db.reservations.updateReservationAttendance(reservation.id, true);
            return reservation;
        }));
    }
    console.log('we done?')
    return null;
}

async function deleteReservation(reservationId) {
    try {
        return await db.reservations.deleteReservation(reservationId);
    }
    catch(e) {
        logger.error(`there was an error deleting the reservation with id: ${reservationId}`);
        logger.error(e);
        return null;
    }
}

module.exports = {
    createReservation: createReservation,
    cancelReservation: cancelReservation,
    getReservationsForUser: getReservationsForUser,
    updateAttendance: updateAttendance,
    deleteReservation: deleteReservation,
};