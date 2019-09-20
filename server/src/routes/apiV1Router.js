'use strict';

const express = require('express');

const adminRouter = require('./adminRouter');
const registrationRouter = require('./registrationRouter');
const userRouter = require('./userRouter');
const publicRouter = require('./publicRouter');

const router = express.Router();

router.use('admin', adminRouter);
router.use('registration', registrationRouter);
router.use('public', publicRouter);
router.use('user', userRouter);

module.exports = router;