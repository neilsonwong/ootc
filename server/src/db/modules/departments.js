'use strict';

const db = require('../sqliteWrapper');
const logger = require('../../logger');
const DbModule = require('./dbModule');
const Department = require('../../models/Department');

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS departments (
            id INTEGER PRIMARY KEY,
            name TEXT UNIQUE NOT NULL,
            description TEXT
        )`,

    insertDepartment: 
        `INSERT INTO departments (name, description) VALUES(?,?)`,
    
    updateDepartment: 
        `UPDATE departments SET name = $name, description = $description WHERE id = $id`,
    // TODO: allow description updates
    
    listDepartments: 
        `SELECT * FROM departments`,

    // deleteDepartment:
};

class DepartmentDbModule extends DbModule {
    constructor() {
        super('departments', sql.createTable, Department);
    }

    async insertDepartment(departmentName, description) {
        const { lastID } = await db.run(sql.insertDepartment, [departmentName, description]);
        return lastID ? new Department(lastID, departmentName, description) : null;
    }

    async updateDepartment(department) {
        department = this.fixType(department);
        const { changes } = await db.run(sql.updateDepartment,
            department.prepare(sql.updateDepartment));
        return changes;
    }

    async listDepartments() {
        const rows = await db.all(sql.listDepartments);
        return rows.map(e => this.fixType(e));
    }
}

module.exports = new DepartmentDbModule();

