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
 *               - description
 *             properties:
 *               departmentName:
 *                 type: string
 *               description:
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
	const description = req.body.description;
	const added = await departmentManager.addDepartment(departmentName, description);
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
 *             $ref: '#/components/schemas/Department'
 *     responses:
 *       200:
 *         description: Updated Department
 *       400:
 *         description: Error updating department
 *       401:
 *         description: Unauthorized
 */
router.post('/departments/update', async (req, res) => {
	const department = req.body;
	const updated = await departmentManager.updateDepartment(department);
	return updated ? 
		res.status(200).json({res: `updated department ${department.name}`}) :
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
	const year = req.query.year || (new Date()).getFullYear();
	const schedule = await scheduleManager.getSchedule(year);
	return schedule ?
		res.status(200).json(schedule) :
		res.status(400).json({error: 'error retrieving schedule'});
});

/**
 * @swagger
 *
 * /admin/schedule/add:
 *   post:
 *     summary: Add a time slot definition 
 *     tags: 
 *       - admin
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: The value of the time slot def to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimeSlotDefNoId'
 *     responses:
 *       200:
 *         description: Time Slot Definition was added sucessfully
 *       400:
 *         description: Unable to add time slot definition
 *       401:
 *         description: Unauthorized
 */
router.post('/schedule/add', async (req, res) => {
	const timeSlotDef = req.body;
	const addedTimeSlotDef = await scheduleManager.addTimeSlotDef(timeSlotDef);
	return addedTimeSlotDef ?
		res.status(201).json(addedTimeSlotDef) :
		res.status(400).json({error: 'could not add schedule slot'});
});

/**
 * @swagger
 *
 * /admin/schedule/remove:
 *   post:
 *     summary: Remove a time slot definition 
 *     tags: 
 *       - admin
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: An Object containing the time slot def id to be removed
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - timeSlotDefId
 *             properties:
 *               timeSlotDefId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Time Slot Definition was removed 
 *       400:
 *         description: Unable to remove the time slot definition
 *       401:
 *         description: Unauthorized
 */
router.post('/schedule/remove', async (req, res) => {
	const timeSlotDefId = req.body.timeSlotDefId;
	const result = scheduleManager.deleteTimeSlotDef(timeSlotDefId);
	return result ?
		res.status(200).json({ res: `removed schedule slotId ${timeSlotDefId}`}) :
		res.status(400).json({ error: `could not remove schedule slotId ${timeSlotDefId}` });

});

/**
 * @swagger
 *
 * /admin/schedule/update:
 *   post:
 *     summary: Update a time slot definition 
 *     tags: 
 *       - admin
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: The value of the time slot def to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimeSlotDef'
 *     responses:
 *       200:
 *         description: Time Slot Definition was updated sucessfully
 *       400:
 *         description: Unable to update time slot definition
 *       401:
 *         description: Unauthorized
 */
router.post('/schedule/update', async (req, res) => {
	const timeSlotDef = req.body;
	const result = scheduleManager.updateTimeSlotDef(timeSlotDef);
	return result ?
		res.status(200).json(timeSlotDef) :
		res.status(400).json({ error: `could not update schedule slotId ${timeSlotDef.id}` });
});

/**
 * @swagger
 *
 * /admin/schedule/generate:
 *   post:
 *     summary: generate a list of time slots based on a time slot definition 
 *     tags: 
 *       - admin
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: The value of the time slot def to be generated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimeSlotDef'
 *     responses:
 *       200:
 *         description: Time Slots were generated based on the definition
 *       400:
 *         description: Unable to generate time slots using the given definition
 *       401:
 *         description: Unauthorized
 */
router.post('/schedule/generate', async(req, res) => {
	const timeSlotDef = req.body;
	const generatedTimeSlots = await scheduleManager.generateTimeSlots(timeSlotDef);
	return generatedTimeSlots ? 
		res.status(201).json(generatedTimeSlots) :
		res.status(400).json({error: 'there was na error generating the schedule using the provided time slot def'});
});

/**
 * @swagger
 *
 * /admin/reserve:
 *   post:
 *     summary: Add a reservation on behalf of a user
 *     tags: 
 *       - admin
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: An object containing the reservation to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReservationNoId'
 *     responses:
 *       200:
 *         description: Time Slots were generated based on the definition
 *       400:
 *         description: Unable to generate time slots using the given definition
 *       401:
 *         description: Unauthorized
 */
router.post('/reserve', async (req, res) => {
	const reservation = req.body;
	const added = await reservationManager.createReservation(reservation);
	return added ?
		res.status(201).json(added) :
		res.status(400).json({error: 'there was an error adding the reservation'});
});

/**
 * @swagger
 *
 * /admin/reservations/delete:
 *   post:
 *     summary: Delete a reservation
 *     tags: 
 *       - admin
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: An Object containing the reservation id to be removed
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
 *       200:
 *         description: The reservation was deleted
 *       400:
 *         description: Unable to delete the reservation
 *       401:
 *         description: Unauthorized
 */
router.post('/reservations/delete', async (req, res) => {
	const reservationId = req.body.reservationId;
	const deleted = await reservationManager.deleteReservation(reservationId)
	return deleted ?
		res.status(200).json({res: 'the reservation was deleted'}) :
		res.status(400).json({error: 'there was an error adding the reservation'});
});

/**
 * @swagger
 *
 * /admin/users:
 *   get:
 *     summary: Gets a list of all users.
 *     tags: 
 *       - admin
 *     produces: application/json
 *     responses:
 *       200:
 *         description: Array of users 
 *       400:
 *         description: Error retrieving list of all users
 *       401:
 *         description: Unauthorized
 */
router.get('/users', async (req, res) => {
	const allUsers = await accountManager.listUsers();
	return allUsers ?
		res.status(200).json(allUsers) :
		res.status(400).json({ error: 'could not get all users' });
});

/**
 * @swagger
 *
 * /admin/user/update:
 *   post:
 *     summary: Update information for a particular user.
 *     tags: 
 *       - admin
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: An Object containing the updated user.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Updated User Object
 *       400:
 *         description: Error updating db with provided user object
 *       401:
 *         description: Unauthorized
 */
router.post('/user/update', async (req, res) => {
	const user = req.body;
	const result = await accountManager.updateUser(user);
	return result ?
		res.status(200).json(user) :
		res.status(400).json({ error: `could not update user with email ${user.email}` });
});

/**
 * @swagger
 *
 * /admin/timeslots:
 *   get:
 *     summary: Get all timeslots between a time range
 *     tags: 
 *       - admin 
 *     produces: application/json
 *     parameters:
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
router.get('/timeslots', async (req, res) => {
	const startDate = req.query.startDate;
	const endDate = req.query.endDate;
	const timeSlots = await scheduleManager.getTimeSlotsByTimeRange(startDate, endDate);
	return timeSlots ?
		res.status(200).json(timeSlots) :
		res.status(400).json({error: `there was an error retrieving time slots`});
});

/**
 * @swagger
 *
 * /admin/timeslot/update:
 *   post:
 *     summary: Update information for a particular timeslot.
 *     tags:
 *       - admin
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: An Object containing the updated timeslot.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TimeSlot'
 *     responses:
 *       200:
 *         description: Updated TimeSlot Object
 *       400:
 *         description: Error updating db with provided timeslot object
 *       401:
 *         description: Unauthorized
 */
router.post('/timeslot/update', async (req, res) => {
	const timeSlot = req.body;
	const result = await scheduleManager.updateTimeSlot(timeSlot);
	return result ?
		res.status(200).json(timeSlot) :
		res.status(400).json({ error: `could not update timeSlot with id ${timeSlot ? timeSlot.id : ''}` });
});

/**
 * @swagger
 *
 * /admin/timeslot/reservations:
 *   get:
 *     summary: Get reservations for a particular time slot
 *     tags: 
 *       - admin 
 *     produces: application/json
 *     parameters:
 *       - in: query
 *         name: timeSlotId
 *         description: timeSlotId
 * 
 *     responses:
 *       200:
 *         description: Array of reservations for the queried time slot
 *       400:
 *         description: Error retrieving reservations for the time slot
 */
router.get('/timeslot/reservations', async (req, res) => {
	const timeSlotId = req.query.timeSlotId;
	const reservations = await scheduleManager.getReservationsForTimeSlot(timeSlotId);
	return reservations ?
		res.status(200).json(reservations) :
		res.status(400).json({error: `there was an error retrieving reservations for the time slot`});
});

/**
 * @swagger
 *
 * /admin/timeslot/refresh:
 *   get:
 *     summary: Get a particular time slot via id
 *     tags: 
 *       - admin 
 *     produces: application/json
 *     parameters:
 *       - in: query
 *         name: timeSlotId
 *         description: timeSlotId
 * 
 *     responses:
 *       200:
 *         description: Time slot for requested id
 *       400:
 *         description: Error retrieving the time slot
 */
router.get('/timeslot/refresh', async (req, res) => {
	const timeSlotId = req.query.timeSlotId;
	const reservations = await scheduleManager.getTimeSlot(timeSlotId);
	return reservations ?
		res.status(200).json(reservations) :
		res.status(400).json({error: `there was an error retrieving the time slot`});
});

module.exports = router;
