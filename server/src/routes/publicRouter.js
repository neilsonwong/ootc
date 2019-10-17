'use strict';

const express = require('express');
const accountManager = require('../core/accountManager');
const authService = require('../services/authService');

const router = express.Router();

/**
 * @swagger
 *
 * /register:
 *   post:
 *     summary: Post to register a new user
 *     tags: 
 *       - public
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: Object containing user fields, and user password.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user: 
 *                 $ref: '#/components/schemas/UserNoId'
 *               password: 
 *                 type: string
 *     responses:
 *       201:
 *         description: User has successfully registered
 *       400:
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
    return res.status(400).json({error: 'unable to register user with data provided'});
});

/**
 * @swagger
 *
 * /login:
 *   post:
 *     summary: Attempt to login with a username and password
 *     tags: 
 *       - public
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: Object containing the username and password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId: 
 *                 type: string
 *               password: 
 *                 type: string
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
 * /resendValidation:
 *   post:
 *     summary: Post request to resend validation email
 *     tags: 
 *       - public
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: Object containing the userId
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId: 
 *                 type: string
 *     responses:
 *       400:
 *         description: Email already validated
 *       200:
 *         description: Validation code was resent
 */
router.post('/resendValidation', async(req, res) => {
    const userId = req.body.userId;
    
    if (await accountManager.isUserValidated(userId)) {
        res.status(400).json({error: 'email already validated'});
    }
    else {
        await accountManager.setupEmailValidation(userId);
        res.status(200).json({res: 'validation code has been sent'})
    }
});

/**
 * @swagger
 *
 * /validateEmail:
 *   post:
 *     summary: Post to validate the new user
 *     tags: 
 *       - public
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: Object containing the username and validation code 
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId: 
 *                 type: string
 *               validationCode: 
 *                 type: integer
 *     responses:
 *       200:
 *         description: Email validated
 *       400:
 *         description: Validation code is invalid
 */
router.post('/validateEmail', async (req, res) => {
    const userId = req.body.userId;
    const validationCode = req.body.validationCode;

    if (await accountManager.validateUser(userId, validationCode)) {
        res.status(200).send({res: `validated ${userId}`});
    }
    else {
        return res.status(400).send({error: 'Invalid validation code'});
    }
});

/**
 * @swagger
 *
 * /resetPassword:
 *   post:
 *     summary: Post to send a reset password email to the user
 *     tags: 
 *       - public 
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: Object containing the username
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId: 
 *                 type: string
 *     responses:
 *       200:
 *         description: If email is valid, a reset password email was sent
 */
router.post('/resetPassword', async(req, res) => {
    const userId = req.body.userId;
    accountManager.resetPassword(userId);
    return res.status(200).json(
        {res: 'reset password email sent if account exists'});
});

/**
 * @swagger
 *
 * /changePassword:
 *   post:
 *     summary: Post to change the users password
 *     tags: 
 *       - public
 *     consumes: application/json
 *     produces: application/json
 *     requestBody:
 *       description: Object containing fields required to change a password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId 
 *               - newPassword
 *             properties:
 *               userId:
 *                 type: string
 *               resetCode:
 *                 type: string
 *               oldPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password was successfully changed
 *       400:
 *         description: Error changing the password
 */
router.post('/changePassword', async(req, res) => {
    const userId = req.body.userId;
    const resetCode = req.body.resetCode;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    
    const pwChanged = await accountManager.changePassword(
        userId, resetCode, oldPassword, newPassword);

    return pwChanged ?
        res.status(200).json({res: 'password was updated'}) :
        res.status(400).json({err: 'unable to update password'});
});

module.exports = router;
