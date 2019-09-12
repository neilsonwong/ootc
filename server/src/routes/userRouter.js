'use strict';

const express = require('express');
const logger = require('../logger');

const router = express.Router();

router.post('/register', (req, res) => {
	return res.status(500).send('not yet implemented');
});

router.post('/validateEmail', (req, res) => {
	return res.status(500).send('not yet implemented');
});

router.post('/reservations/add', (req, res) => {
	return res.status(500).send('not yet implemented');
});

router.get('/reservations', (req, res) => {
	return res.status(500).send('not yet implemented');
});

module.exports = router;
