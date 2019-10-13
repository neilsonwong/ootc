'use strict';

const express = require('express');
const logger = require('../logger');
const basicAuth = require('express-basic-auth');
const authService = require('../services/authService');
const accountManager = require('../core/accountManager');
const scheduleManager = require('../core/scheduleManager');
const departmentManager = require('../core/departmentManager');
const reservationManager = require('../core/reservationManager');

const router = express.Router();

// add admin authentication
router.use(basicAuth({
	authorizer: authService.isValidAdminWithCb,
	authorizeAsync: true,
}));

/**
 * @swagger
 *
 * /admin/departments/add:
 *   post:
 *     summary: Add a department
 *     tags: 
 *       - admin
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: The department name to create.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - departmentName
 *             properties:
 *               departmentName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Department added
 *       400:
 *         description: Error adding department
 *       401:
 *         description: Unauthorized
 */
router.post('/departments/add', async (req, res) => {
	const departmentName = req.body.departmentName;
	console.log(req.body);
	const added = await departmentManager.addDepartment(departmentName);
	return added ? 
		res.status(201).json(added) :
		res.status(400).json({error: 'error creating department'});
});

/**
 * @swagger
 *
 * /admin/departments/update:
 *   post:
 *     summary: Update a department
 *     tags: 
 *       - admin
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: The value of the department to be updated.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - department
 *             properties:
 *               department:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated Department
 *       400:
 *         description: Error updating department
 *       401:
 *         description: Unauthorized
 */
router.post('/departments/update', async (req, res) => {
	const department = req.body.department;
	const updated = await departmentManager.updateDepartment(department);
	return updated ? 
		res.status(200).json({res: `updated department ${department}`}) :
		res.status(400).json({error: 'error updating department'});
});

/**
 * @swagger
 *
 * /admin/schedule:
 *   get:
 *     summary: Get all time slot definitions for a year, defaults to current year
 *     tags: 
 *       - admin
 *     produces: application/json
 *     parameters:
 *       - in: query
 *         name: year
 *         description: The year for the schedule.
 *     responses:
 *       200:
 *         description: Array of time slot definitions for the year
 *       400:
 *         description: Error retrieving schedule
 *       401:
 *         description: Unauthorized
 */
router.get('/schedule', async (req, res) => {
	const year = req.params.year || (new Date()).getFullYear();
	const schedule = await scheduleManager.getSchedule(year);
	return schedule ?
		res.status(200).json(schedule) :
		res.status(400).json({error: 'error retrieving schedule'});
});

// add a timeSlotDefinition
// json body contains timeSlotDefinition to add
router.post('/schedule/add', async (req, res) => {
	const timeSlotDef = req.body.timeSlotDef;
	const addedTimeSlotDef = await scheduleManager.addTimeSlotDef(timeSlotDef);
	return addedTimeSlotDef ?
		res.status(201).json(addedTimeSlotDef) :
		res.status(400).json({error: 'could not add schedule slot'});
});

// remove a timeSlotDefinition
// json body contains timeSlotDef to remove
// can use an Id or use a combination of dayOfWeek + startTIme + activityType
router.post('/schedule/remove', async (req, res) => {
	const timeSlotDefId = req.body.timeSlotDefId;
	const result = scheduleManager.deleteTimeSlotDef(timeSlotDefId);
	return result ?
		res.status(200).json({ res: `removed schedule slotId ${timeSlotDefId}`}) :
		res.status(400).json({ error: `could not remove schedule slotId ${timeSlotDefId}` });

});

// update a timeSlotDefinition
// json body contains timeSlotDefinition to update
router.post('/schedule/update', async (req, res) => {
	const timeSlotDef = req.body.timeSlotDef;
	const result = scheduleManager.updateTimeSlotDef(timeSlotDef);
	return result ?
		res.status(200).json(timeSlotDef) :
		res.status(400).json({ error: `could not update schedule slotId ${timeSlotDef.id}` });
});

router.post('/schedule/generate', async(req, res) => {
	const timeSlotDef = req.body.timeSlotDef;
	const generatedTimeSlots = await scheduleManager.generateTimeSlots(timeSlotDef);
	return generatedTimeSlots ? 
		res.status(201).json(generatedTimeSlots) :
		res.status(400).json({error: 'there was na error generating the schedule using the provided time slot def'});
});

// add a reservation
// json body contains userId and timeSlotId
router.post('/reserve', async (req, res) => {
	const reservation = req.body.reservation;
	const added = await reservationManager.createReservation(reservation);
	return added ?
		res.status(201).json(added) :
		res.status(400).json({error: 'there was an error adding the reservation'});
});

// delete a reservation
// json body contains userId and timeSlotId
router.post('/reservations/delete', async (req, res) => {
	const reservationId = req.body.reservationId;
	const deleted = await reservationManager.deleteReservation(reservationId)
	return deleted ?
		res.status(200).json({res: 'the reservation was deleted'}) :
		res.status(400).json({error: 'there was an error adding the reservation'});
});

// gets the list of all users
// no params
router.get('/users', async (req, res) => {
	const allUsers = await accountManager.listUsers();
	return allUsers ?
		res.status(200).json(allUsers) :
		res.status(400).json({ error: 'could not get all users' });
});

// update a user
// json body contains user details
router.post('/user/update', async (req, res) => {
	const user = req.body.user;
	const result = await accountManager.updateUser(user);
	return result ?
		res.status(200).json(user) :
		res.status(400).json({ error: `could not update user with email ${user.email}` });
});

module.exports = router;
