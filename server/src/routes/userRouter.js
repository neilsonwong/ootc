'use strict';

const express = require('express');
const logger = require('../logger');
const basicAuth = require('express-basic-auth');
const authService = require('../services/authService');

const router = express.Router();

// add user authentication
router.use(basicAuth({
	authorizer: authService.isValidUserWithCb,
	authorizeAsync: true,
}));

router.get('/departments', async (req, res) => {

});

router.post('/reservations/add', (req, res) => {
	return res.status(500).send('not yet implemented');
});

router.get('/reservations', (req, res) => {
	return res.status(500).send('not yet implemented');
});

router.get('/timeSlots', (req, res) => {

});

router.post('/changePassword', async(req, res) => {

});

module.exports = router;
