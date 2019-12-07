'use strict';

const moment = require('moment');

const db = require('../db/db');
const logger = require('../logger');
const apiReqValidator = require('../util/apiRequestValidator');

// create
async function createReservation(reservation) {
    try {
        const err = apiReqValidator.validateReservationCreation(reservation);
        if (err) {
            throw err;
        }

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
        const err = (apiReqValidator.validateReservationId(reservationId) || apiReqValidator.validateUserId(userId));
        if (err) {
            throw err;
        }
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
        const err = apiReqValidator.validateUserId(userId);
        if (err) {
            throw err;
        }
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
    try {
        let updateDate;
        let err = apiReqValidator.validateUserId(userId);
        if (err) {
            throw err;
        }
        if (overrideDate) {
            err = apiReqValidator.isValidYYYYMMDD(overrideDate);
            if (err) {
                throw err;
            }
            updateDate = moment(overrideDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
        }
        else {
            updateDate = moment().format('YYYY-MM-DD');
        }

        const reservations = await db.reservations.getReservationsForUserOnDate(userId, updateDate);
        if (reservations && reservations.length > 0) {
            return await Promise.all(reservations.map((reservation) => {
                db.reservations.updateReservationAttendance(reservation.id, true);
                return reservation;
            }));
        }
    }
    catch(e) {
        logger.error(`there was an error updating the attendance for ${userId}`);
        logger.error(e);
    }
    return null;
}

async function deleteReservation(reservationId) {
    try {
        const err = apiReqValidator.validateReservationId(reservationId);
        if (err) {
            throw err;
        }
        return await db.reservations.deleteReservation(reservationId);
    }
    catch(e) {
        logger.error(`there was an error deleting the reservation with id: ${reservationId}`);
        logger.error(e);
        return null;
    }
}

async function deleteReservationsForUser(userId) {
    try {
        const err = apiReqValidator.validateUserId(userId);
        if (err) {
            throw err;
        }

        const reservations = await getReservationsForUser(userId);
        const results = await Promise.all(reservations.map((reservation) => {
            return db.reservations.deleteReservation(reservation.id);
        }));
        const lesResults = results.reduce((acc, cur) => (acc && cur), true);
        return lesResults;
    }
    catch(e) {
        logger.error(`there was an error deleting all reservations for user with id: ${userId}`);
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
    deleteReservationsForUser: deleteReservationsForUser,
};