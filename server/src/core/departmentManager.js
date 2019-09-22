'use strict';

const db = require('../db/db');
const logger = require('../logger');

async function addDepartment(departmentName) {
    console.log(departmentName);
    try {
        return await db.departments.insertDepartment(departmentName);
    }
    catch (e) {
        logger.error(`there was an error adding department ${departmentName}`);
        logger.error(departmentName);
        logger.error(e);
        return null;
    }
}

async function updateDepartment(department) {
    try {
        return await db.departments.updateDepartment(department);
    }
    catch (e) {
        logger.error(`there was an error updating department ${department}`);
        logger.error(department);
        logger.error(e);
        return null;
    }
}

async function listDepartments() {
    try {
        return await db.departments.listDepartments();
    }
    catch (e) {
        logger.error(`there was an error listing all departments`);
        logger.error(e);
        return null;
    }
}

module.exports = {
    addDepartment: addDepartment,
    updateDepartment: updateDepartment,
    listDepartments: listDepartments
};
