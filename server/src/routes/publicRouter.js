'use strict';

const express = require('express');
const accountManager = require('../core/accountManager');
const authService = require('../services/authService');

const router = express.Router();

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
