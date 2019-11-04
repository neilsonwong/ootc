'use strict';

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const greenlock = require("greenlock-express"); 

const logger = require('./logger');
const config = require('../config');
const apiV1Router = require('./routes/apiV1Router');

let app = express();

function setup() {
  app.set('port', config.PORT);
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
}

function initWebServer() {
  setup();
  defineRoutes();

  if (config.DEV_OPTIONS.ENABLED) {
    app.listen(config.PORT, function () {  
      logger.info(`server running on ${config.PORT}`);
    });
  }
  else {
    greenlock
      .init(getConfig)
      .serve((server) => {
        server.serveApp(app);
      });
  }
}

function getConfig() {
  return {
    package: { name: 'ootc-ui', version: '0.8' },
    maintainerEmail: 'ootc.tccc.test@gmail.com',
    cluster: false
  };
}

module.exports = {
  init: initWebServer
};
