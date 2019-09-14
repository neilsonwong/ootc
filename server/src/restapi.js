'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

const logger = require('./logger');
const config = require('../config');

const exampleRouter = require('./routes/exampleRouter');
const adminRouter = require('./routes/adminRouter');
const registrationRouter = require('./routes/registrationRouter');
const userRouter = require('./routes/userRouter');

let app = express();

function setup() {
  app.use((req, res, next) => {
    logger.trace(req);
    return next();
  });
  app.use(compression());
  app.use(cors());
  // app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.text());

  /////////////////////////////////////////
  // put routers here
  /////////////////////////////////////////

  app.use('example', exampleRouter);
  app.use('admin', adminRouter);
  app.use('registration', registrationRouter);
  app.use(userRouter);
}

function defineRoutes() {
  app.get('/', (req, res) => {  
    res.send('Hello this is Sylvanas!');
  });
}

function initWebServer() {
  setup();
  defineRoutes();
  
  app.listen(config.PORT, function () {  
    logger.info(`server running on ${config.PORT}`);
  });
}

module.exports = {
  init: initWebServer
};
