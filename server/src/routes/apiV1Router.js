'use strict';

const express = require('express');
const jwt = require('./middleware/jwt');
const checkAdmin = require('./middleware/adminMiddleware');

const config = require('../../config');

const adminRouter = require('./adminRouter');
const registrationRouter = require('./registrationRouter');
const userRouter = require('./userRouter');
const publicRouter = require('./publicRouter');
const swaggerDocs = require('./swaggerRouter');

const router = express.Router();

const publicPaths = [
    // public routes that don't require authentication
    '/',
    ...publicRouter.fullPaths
];

if (config.DEV_OPTIONS.ENABLED) {
    // enable swagger for dev mode
    router.use('/docs', swaggerDocs.serve, swaggerDocs.doc);
}

// secure all routes
router.use(jwt(publicPaths));

router.use(publicRouter);

// user routes are secured
router.use('/user', userRouter);

// secure admin routes
router.use(checkAdmin);
router.use('/admin', adminRouter);
router.use('/registration', registrationRouter);

module.exports = router;