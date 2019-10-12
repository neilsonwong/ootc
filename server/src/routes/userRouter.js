'use strict';

const express = require('express');
const logger = require('../logger');
const basicAuth = require('express-basic-auth');
const authService = require('../services/authService');
const departmentManager = require('../core/departmentManager');
const reservationManager = require('../core/reservationManager');
const scheduleManager = require('../core/scheduleManager');

const router = express.Router();

// add user authentication
router.use(basicAuth({
	authorizer: authService.isValidUserWithCb,
	authorizeAsync: true,
}));

router.get('/departments', async (req, res) => {
	const allDepts = await departmentManager.listDepartments();
	return allDepts ?
		res.status(200).json(allDepts) :
		res.status(400).json({error: 'there was an error retrieving the departments list'});
});

router.post('/reservations/add', async (req, res) => {
	const reservation = req.body.reservation;
	const userId = req.auth.user;
	if (reservation.user === userId) {
		const added = await reservationManager.createReservation(reservation);
		return added ?
			res.status(201).json(added) :
			res.status(400).json({error: 'there was an error adding the reservation'});
	}
	else {
		res.status(401).json({error: 'not authorized to add the reservation'});
	}
});

router.post('/reservations/cancel', async (req, res) => {
	const userId = req.auth.user;
	const reservationId = req.body.reservationId;
	const canceled = await reservationManager.cancelReservation(reservationId, userId)
	return canceled ?
		res.status(200).json({res: 'the reservation was cancelled'}) :
		res.status(400).json({error: 'there was an error cancelling the reservation'});
});

router.get('/reservations', async (req, res) => {
	// get reservations for user id
	const userId = req.auth.user;
	const reservations = await reservationManager.getReservationsForUser(userId);
	return reservations ?
		res.status(200).json(reservations) :
		res.status(400).json({error: `there was an error retrieving reservations for ${userId}`});
});

router.get('/timeSlots', async (req, res) => {
	const departmentId = req.query.departmentId;
	const startDate = req.query.startDate;
	const endDate = req.query.endDate;
	const timeSlots = await scheduleManager.getTimeSlotsForDept(departmentId, startDate, endDate);
	return timeSlots ?
		res.status(200).json(timeSlots) :
		res.status(400).json({error: `there was an error retrieving time slots for ${departmentId}`});
});

router.post('/changePassword', async(req, res) => {
	return res.status(500).send('not yet implemented');
});

module.exports = router;
