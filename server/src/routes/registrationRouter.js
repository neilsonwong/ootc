'use strict';

const express = require('express');
const logger = require('../logger');
const basicAuth = require('express-basic-auth');
const authService = require('../services/authService');
const reservationManager = require('../core/reservationManager');

const router = express.Router();

// add user authentication
router.use(basicAuth({
	authorizer: authService.isValidAdminWithCb,
	authorizeAsync: true,
}));

router.post('/signin', async (req, res) => {
	const userId = req.body.userId;
	const signedIn = await reservationManager.updateAttendance(userId);
	return signedIn ? 
		res.status(200).json({res: `we have successfully signed in ${userId}`}) :
		res.status(400).json({error: `there was an error signing in the ${userId}`});
});

module.exports = router;
