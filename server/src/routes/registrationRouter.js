'use strict';

const express = require('express');
const logger = require('../logger');
const basicAuth = require('express-basic-auth');
const authService = require('../services/authService');
const reservationManager = require('../core/reservationManager');

const router = express.Router();

// add user authentication
router.use(basicAuth({
	authorizer: authService.isValidUserWithCb,
	authorizeAsync: true,
}));

router.post('/signin', async (req, res) => {
	const userId = req.body.userId;
	await reservationManager.updateAttendance(userId);
});

module.exports = router;
