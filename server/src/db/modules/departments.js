'use strict';

const db = require('../sqliteWrapper');
const DbModule = require('./dbModule');
const Department = require('../../models/Department');

const sql = {
    createTable: 
        `CREATE TABLE IF NOT EXISTS departments (
            id INTEGER PRIMARY KEY,
            name TEXT
        )`,

    insertDepartment: 
        `INSERT INTO departments (name) VALUES(?)`,
    
    updateDepartment: 
        `UPDATE departments SET name = $name WHERE id = $id`,
    
    listDepartments: 
        `SELECT * FROM departments`,

    // deleteDepartment:
};

class DepartmentDbModule extends DbModule {
    constructor() {
        super('departments', sql.createTable);
    }

    async insertDepartment(departmentName) {
        return await db.run(sql.insertDepartment, [departmentName]);
    }

    async updateDepartment(department) {
        return await db.run(sql.updateDepartment, department.prepare(sql.updateDepartment));
    }

    async listDepartments() {
        const rows = await db.all(sql.listDepartments);
        return rows.map(e => Object.assign(new Department(), e));
    }
}

module.exports = new DepartmentDbModule();

