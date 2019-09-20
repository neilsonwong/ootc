'use strict';

const express = require('express');
const accountManager = require('../core/accountManager');
const authService = require('../services/authService');

const router = express.Router();

router.post('/register', async (req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    const registeredUser = await accountManager.register(user, password);

    if (registeredUser !== null) {
        return res.status(201).json(registeredUser);
    }
    else {
        return res.status(500);
    }
});

router.post('/login', async (req, res) => {
    const userId = req.body.userId;
    const password = req.body.password;
    
    if (await accountManager.isUserValidated(userId)) {
        // check password
        if (await (authService.isValidUser(userId, password))) {
            return res.status(200).send('OK');
        }
    }
	return res.status(500).send('not yet implemented');
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
