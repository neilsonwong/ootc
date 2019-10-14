'use strict';

const configEg = require('../../config.eg');
const config = require('../../config');
const logger = require('../logger');

function checkConfig() {
    const key = compareKeys(configEg, config)
    if (key !== null) {
        logger.error('configs don\'t match, please make sure config.json is compatible with config.eg.json');
        logger.error(`the violating key is '${key}'`);
    }
    else {
        logger.info('config.json is VALID');
    }
}

function compareKeys(a, b) {
    for (let key of Object.keys(a)) {
        if (b[key] === undefined) {
            return key;
        }
        // this bottom part might not be perfect, but don't need it now
        else if (typeof a[key] === 'object' && !Array.isArray(a[key])) {
            if (compareKeys(a[key], b[key]) !== null) {
                return key;
            }
        }
    }
    return null;
}

module.exports = {
    checkConfig: checkConfig
};
