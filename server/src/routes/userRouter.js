'use strict';

const express = require('express');
const logger = require('../logger');
const basicAuth = require('express-basic-auth');
const authService = require('../services/authService');
const accountManager = require('../core/accountManager');
const departmentManager = require('../core/departmentManager');
const reservationManager = require('../core/reservationManager');
const scheduleManager = require('../core/scheduleManager');

const router = express.Router();

// add user authentication
// router.use(basicAuth({
// 	authorizer: authService.isValidUserWithCb,
// 	authorizeAsync: true,
// }));

/**
 * @swagger
 *
 * /user/departments:
 *   get:
 *     summary: Get all departmenets
 *     tags: 
 *       - user
 *     produces: application/json
 *     responses:
 *       200:
 *         description: Array of Depts
 *       400:
 *         description: Error retrieving Depts
 */

router.get('/departments', async (req, res) => {
	const allDepts = await departmentManager.listDepartments();
	return allDepts ?
		res.status(200).json(allDepts) :
		res.status(400).json({error: 'there was an error retrieving the departments list'});
});


/**
 * @swagger
 *
 * /user/reservations/add:
 *   post:
 *     summary: Post to add reservations to a user's schedule
 *     tags: 
 *       - user
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: Object containing the reservation to add
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user: 
 *                 $ref: '#/components/schemas/ReservationNoId'
 *     responses:
 *       201:
 *         description: User has added reservations
 *       400:
 *         description: Error adding reservations
 *       401:
 * 	       description: Not authorized
 */
router.post('/reservations/add', async (req, res) => {
	const reservation = req.body.reservation;
	const userId = req.user.sub;
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


/**
 * @swagger
 *
 * /user/reservations/cancel:
 *   post:
 *     summary: Post to cancel reservation from a user's schedule
 *     tags: 
 *       - user
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: An object containing the reservation id to be cancelled
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reservationId
 *             properties:
 *               reservationId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: User has cancelled reservation
 *       400:
 *         description: Error cancelling reservation
 */
router.post('/reservations/cancel', async (req, res) => {
	const userId = req.user.sub;
	const reservationId = req.body.reservationId;
	const canceled = await reservationManager.cancelReservation(reservationId, userId)
	return canceled ?
		res.status(200).json({res: 'the reservation was cancelled'}) :
		res.status(400).json({error: 'there was an error cancelling the reservation'});
});

/**
 * @swagger
 *
 * /user/reservations:
 *   get:
 *     summary: Get all reservations for the user
 *     tags: 
 *       - user
 *     produces: application/json
 *     parameters:
 *       - in: query
 *         name: year
 *         description: The year for the schedule.
 *     responses:
 *       200:
 *         description: Array of user's reservations
 *       400:
 *         description: Error retrieving reservations for user
 */
router.get('/reservations', async (req, res) => {
	// get reservations for user id
	const userId = req.user.sub;
	const reservations = await reservationManager.getReservationsForUser(userId);
	return reservations ?
		res.status(200).json(reservations) :
		res.status(400).json({error: `there was an error retrieving reservations for ${userId}`});
});

/**
 * @swagger
 *
 * /user/timeSlots:
 *   get:
 *     summary: Get all timeslots for Dept
 *     tags: 
 *       - user
 *     produces: application/json
 *     parameters:
 *       - in: query
 *         name: departmentId 
 *         description: The id of the department
 *       - in: query
 *         name: startDate
 *         description: The startDate of the range
 *       - in: query
 *         name: endDate
 *         description: The endDate of the range
 * 
 *     responses:
 *       200:
 *         description: Array of user's reservations
 *       400:
 *         description: Error retrieving reservations for user
 */
router.get('/timeSlots', async (req, res) => {
	const departmentId = req.query.departmentId;
	const startDate = req.query.startDate;
	const endDate = req.query.endDate;
	const timeSlots = await scheduleManager.getTimeSlotsForDept(departmentId, startDate, endDate);
	return timeSlots ?
		res.status(200).json(timeSlots) :
		res.status(400).json({error: `there was an error retrieving time slots for ${departmentId}`});
});

module.exports = router;
