'use strict';

const express = require('express');
const logger = require('../logger');
const basicAuth = require('express-basic-auth');
const authService = require('../services/authService');
const accountManager = require('../core/accountManager');
const scheduleManager = require('../core/scheduleManager');

const router = express.Router();

// add admin authentication
router.use(basicAuth({
	authorizer: authService.isValidAdminWithCb,
	authorizeAsync: true,
}));

// returns the array of timeSlotDefinitions that are set up
// no params
router.get('/schedule', async (req, res) => {
	const year = req.params.year || (new Date()).getFullYear();
	const schedule = await scheduleManager.getSchedule(year);
	return schedule ?
		res.status(200).json(schedule) :
		res.status(400);
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
	console.log(result)
	return result ?
		res.status(200).json(timeSlotDef) :
		res.status(400).json({ error: `could not update schedule slotId ${timeSlotDef.id}` });
});

router.post('/schedule/generate', async(req, res) => {
	const start = req.body.start;
	const end = req.body.end;
	await scheduleManager.generateTimeSlots(start, end);

	return res.status(500).json({error: 'NOT YET IMPLEMENTED'});
});

// add a reservation
// json body contains userId and timeSlotId
router.post('/reserve', async (req, res) => {
	return res.status(500).send('not yet implemented');
});

// delete a reservation
// json body contains userId and timeSlotId
router.post('/reservations/delete', async (req, res) => {
	return res.status(500).send('not yet implemented');
});

// gets the list of all users
// no params
router.get('/users', async (req, res) => {
	const allUsers = await accountManager.listUsers();
	return allUsers ?
		res.status(200).json(allUsers) :
		res.status(500).json({ error: 'could not get all users' });
});

// update a user
// json body contains user details
router.post('/user/update', async (req, res) => {
	const user = req.body.user;
	const result = await accountManager.updateUser(user);
	console.log(result)
	return result ?
		res.status(200).json(user) :
		res.status(400).json({ error: `could not update user with email ${user.email}` });
});

module.exports = router;
