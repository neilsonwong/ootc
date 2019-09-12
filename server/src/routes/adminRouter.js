'use strict';

const express = require('express');
const logger = require('../logger');

const router = express.Router();

// returns the array of timeSlotDefinitions that are set up
// no params
router.get('/schedule', (req, res) => {
	return res.status(500).send('not yet implemented');
});

// add a timeSlotDefinition
// json body contains timeSlotDefinition to add
router.post('/schedule/add', (req, res) => {
	return res.status(500).send('not yet implemented');
});

// remove a timeSlotDefinition
// json body contains timeSlotDef to remove
// can use an Id or use a combination of dayOfWeek + startTIme + activityType
router.post('/schedule/remove', (req, res) => {
	return res.status(500).send('not yet implemented');
});

// update a timeSlotDefinition
// json body contains timeSlotDefinition to update
router.post('/schedule/update', (req, res) => {
	return res.status(500).send('not yet implemented');
});

// add a reservation
// json body contains userId and timeSlotId
router.post('/reserve', (req, res) => {
	return res.status(500).send('not yet implemented');
});

// delete a reservation
// json body contains userId and timeSlotId
router.post('/reservations/delete', (req, res) => {
	return res.status(500).send('not yet implemented');
});

// gets the list of all users
// no params
router.get('/users', (req, res) => {
	return res.status(500).send('not yet implemented');
});

// update a user
// json body contains user details
router.post('/user/update', (req, res) => {
	return res.status(500).send('not yet implemented');
});

module.exports = router;
