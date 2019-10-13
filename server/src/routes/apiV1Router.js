'use strict';

const express = require('express');

const adminRouter = require('./adminRouter');
const registrationRouter = require('./registrationRouter');
const userRouter = require('./userRouter');
const publicRouter = require('./publicRouter');
const swaggerDocs = require('./swaggerRouter');

const router = express.Router();

router.use('/admin', adminRouter);
router.use('/registration', registrationRouter);
router.use('/user', userRouter);
router.use('/docs', swaggerDocs.serve, swaggerDocs.doc);
router.use(publicRouter);

module.exports = router;