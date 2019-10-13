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

/**
 * @swagger
 *
 * /registration/signin:
 *   post:
 *     summary: Post for sign-in 
 *     tags: 
 *       - admin
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - in: body
 *         name: userId
 *         description: The user's Id
 *         schema:
 *           type: object
 *           required:
 *             - UserId
 *           properties:
 *             id:
 *               type: string
 *     responses:
 *       200:
 *         description: User has successfully signed-in
 *       400:
 *         description: Error occured during sign-in
 *       401:
 *         description: Unauthorized
 */

router.post('/signin', async (req, res) => {
	const userId = req.body.userId;
	const signedIn = await reservationManager.updateAttendance(userId);
	return signedIn ? 
		res.status(200).json({res: `we have successfully signed in ${userId}`}) :
		res.status(400).json({error: `there was an error signing in the ${userId}`});
});

module.exports = router;
