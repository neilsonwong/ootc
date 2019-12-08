'use strict';

const expressJwt = require('express-jwt');
const config = require('../../../config');

function jwt(publicPaths) {
    return expressJwt({ secret: config.JWT.SECRET }).unless({
        path: publicPaths || []
    });
}

module.exports = jwt;
