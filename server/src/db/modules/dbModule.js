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

    fixType(candidate) {
        if (this.baseType) {
            return candidate instanceof this.baseType ? candidate:
                Object.assign(new this.baseType(), candidate);
        }
        else {
            logger.error('fixType called without an assigned baseType');
        }
    }
}

module.exports = DbModule;
