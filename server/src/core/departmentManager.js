'use strict';

const db = require('../db/db');
const logger = require('../logger');
const apiReqValidator = require('../util/apiRequestValidator');

async function addDepartment(departmentName, description) {
    try {
        const err = (apiReqValidator.validateDepartmentName(departmentName) || apiReqValidator.validateDepartmentDescription());
        if (err) {
            throw err;
        }
        return await db.departments.insertDepartment(departmentName, description);
    }
    catch (e) {
        logger.error(`there was an error adding department ${departmentName}`);
        logger.error(departmentName);
        logger.error(e);
    }
    return null;
}

async function updateDepartment(department) {
    try {
        const err = apiReqValidator.validateDepartment(department);
        if (err) {
            throw err;
        }
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
