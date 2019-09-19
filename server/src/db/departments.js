'use strict';

const db = require('./sqliteWrapper');
const Department = require('../models/Department');

async function createTable() {
    return await db.run(sql.createTable);
}

async function insertDepartment(departmentName) {
    return await db.run(sql.insertDepartment, [departmentName]);
}

async function updateDepartment(department) {
    return await db.run(sql.updateDepartment, department.prepare(sql.updateDepartment));
}

async function listDepartments() {
    const rows = await db.all(sql.listDepartments);
    return rows.map(e => Object.assign(new Department(), e));
}

module.exports = {
    name: 'departments',
    createTable: createTable,
    insertDepartment: insertDepartment,
    updateDepartment: updateDepartment,
    listDepartments: listDepartments,
};

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
