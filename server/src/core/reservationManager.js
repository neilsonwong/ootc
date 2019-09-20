'use strict';

// create
async function createReservation() {

}

// delete
async function deleteReservation() {

}

// sign in
async function updateAttendance(userId) {
    // check whether there is a sign in for the time
    const now = Date.now();
    const reservation = await db.reservations.findReservationByUserAndTime(userId, now);
    if (reservation) {
        return await db.reservations.updateReservationAttendance(reservation.id, true);
    }
    return null;
}

module.exports = {
    createReservation: createReservation,
    deleteReservation: deleteReservation,
    updateAttendance: updateAttendance,
};