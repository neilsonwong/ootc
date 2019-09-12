'use strict';

const express = require('express');
const logger = require('../logger');

const router = express.Router();

router.post('/signIn', (req, res) => {
	return res.status(200).send('world');
});

module.exports = router;
