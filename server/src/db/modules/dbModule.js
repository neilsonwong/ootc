'use strict';

const db = require('../sqliteWrapper');

class DbModule {
    constructor(name, createStmt) {
        this.name = name;
        this.createStmt = createStmt;
    }

    async createTable() {
        return await db.run(this.createStmt);
    }
}

module.exports = DbModule;
