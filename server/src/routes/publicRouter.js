'use strict';

const express = require('express');
const accountManager = require('../core/accountManager');
const authService = require('../services/authService');

const router = express.Router();

/**
 * @swagger
 *
 * /registration/register:
 *   post:
 *     summary: Post to register a new user
 *     tags: 
 *       - public
 *     consumes: application/json
 *     produces: application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user's email
 *         schema:
 *           type: object
 *           required:
 *             - Username (or email)
 *           properties:
 *             id:
 *               type: string
 *       - in: body
 *         name: password
 *         description: The user's password
 *         schema:
 *           type: object
 *           required:
 *             - Password
 *           properties:
 *             id:
 *               type: string
 *     responses:
 *       201:
 *         description: User has successfully registered
 *       500:
 *         description: User could not register wtih data provided
 */

router.post('/register', async (req, res) => {
    const user = req.body.user;
    const password = req.body.password;

    if (user && password) {
        const registeredUser = await accountManager.register(user, password);

        if (registeredUser !== null) {
            return res.status(201).json(registeredUser);
        }
    }
    return res.status(500).json({error: 'unable to register user with data provided'});
});

/**
 * @swagger
 *
 * /registration/login:
 *   post:
 *     summary: Post to register a new user
 *     tags: 
 *       - public
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
 *       - in: body
 *         name: password
 *         description: The user's password
 *         schema:
 *           type: object
 *           required:
 *             - Password
 *           properties:
 *             id:
 *               type: string
 *     responses:
 *       200: 
 *         description: User/Admin has logged in
 *       401:
 *         description: User has passed invalid credentials
 *       400:
 *         description: User could not register wtih data provided
 */

router.post('/login', async (req, res) => {
    const userId = req.body.userId;
    const password = req.body.password;
    
    if (await accountManager.isUserValidated(userId)) {
        // check password
        if (await (authService.isValidUser(userId, password))) {
            const isAdmin = await accountManager.isAdmin(userId);
            return res.status(200).send({securityClearance: isAdmin ? 2 : 1});
        }
        return res.status(401).json({ error: 'invalid login credentials'});
    }
	return res.status(400).json({ error: 'user has not validated their email'});
});

/**
 * @swagger
 *
 * /registration/resendValidation:
 *   post:
 *     summary: Post request to resend validation email
 *     tags: 
 *       - public
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
 *       400:
 *         description: User already validated
 *       200:
 *         description: Validation code resent
 */

router.post('/resendValidation', async(req, res) => {
    const userId = req.body.userId;
    
    if (await accountManager.isUserValidated(userId)) {
        res.status(400).json({error: 'user already validated'});
    }
    else {
        await accountManager.setupEmailValidation(userId);
        res.status(200).json({res: 'validation code has been sent'})
    }
});

/**
 * @swagger
 *
 * /registration/validateEmail:
 *   post:
 *     summary: Post to validate the new user
 *     tags: 
 *       - public
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
 *       - in: body
 *         name: validationCode
 *         description: The registration validationCode 
 *         schema:
 *           type: object
 *           required:
 *             - ValidationCode
 *           properties:
 *             id:
 *               type: string
 *     responses:
 *       200:
 *         description: User validated
 *       500:
 *         description: Code invalid
 */

router.post('/validateEmail', async (req, res) => {
    const userId = req.body.userId;
    const validationCode = req.body.validationCode;

    if (await accountManager.validateUser(userId, validationCode)) {
        res.status(200).send('OK');
    }
    else {
        return res.status(400).send('Invalid validation code');
    }
});

module.exports = router;
