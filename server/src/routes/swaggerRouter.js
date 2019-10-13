'use strict';

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = {
    info: {
        title: 'OOTC API',
        version: '1.0.0',
        description: 'Out of the Cold Server API',
    },
    basePath: '/api/v1'
};
const options = {
    swaggerDefinition,
    apis: ['src/routes/*Router.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
    serve: swaggerUi.serve,
    doc: swaggerUi.setup(swaggerSpec)
};
