'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');

const logger = require('./logger');
const config = require('../config');
const apiV1Router = require('./routes/apiV1Router');
const swaggerDocs = require('./routes/swaggerRouter');

let app = express();

function setup() {
  app.use((req, res, next) => {
    logger.trace(req);
    return next();
  });
  app.use(compression());
  app.use(cors());
  // app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
}

function defineRoutes() {
  app.get('/', (req, res) => {  
    res.send('Hello this is Sylvanas!');
  });

  app.use('/api/v1', apiV1Router);
  app.use('/api/v1/swagger', swaggerDocs.serve, swaggerDocs.doc);
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
