'use strict';

const db = require('../sqliteWrapper');
const logger = require('../../logger');

class DbModule {
    constructor(name, createStmt, baseType) {
        this.name = name;
        this.createStmt = createStmt;
        this.baseType = baseType;
    }

    async createTable() {
        return await db.run(this.createStmt);
    }

    fixType(candidate, type) {
        if (!type) {
            type = this.baseType;
        }

        if (type) {
            return candidate instanceof type ? candidate:
                Object.assign(new type(), candidate);
        }
        else {
            logger.error('fixType called without an assigned baseType');
        }
    }
}

module.exports = DbModule;
