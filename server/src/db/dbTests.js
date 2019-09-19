'use strict';

const db = require('./db');
const logger = require('../logger');

const User = require('../models/User');

async function testUsers() {
    logger.info('Running tests for Users');
    
    logger.info('Testing user creation');
    const email = `a_${Date.now()}@b.com`;

    const a = new User(email, email, 'a-fname', 'a-mname', 'a-lname', '416-123-4567', 99, '', '', false, false);
    await db.users.insertUser(a);

    logger.info('Testing user validation');
    await db.users.validateUser(email);

    logger.info('Testing user update admin status');
    await db.users.updateAdminStatus(email, true);

    logger.info('Testing user update other fields');
    const a_updated = new User(email, email, 'a-fname2', 'a-mname2', 'a-lname2', '905-123-4567', 98, 'hello', 'world', false, false);
    await db.users.updateUser(a_updated);

    logger.info('Testing get all users');
    const alls = await db.users.listUsers();
}

async function testDepartments() {
    logger.info('Running tests for Departments');
    
    logger.info('Testing department creation');
    await db.departments.insertDepartment('Dept A');
    await db.departments.insertDepartment('Dept B');
    await db.departments.insertDepartment('Dept C');

    logger.info('Testing list departments');
    const allDepts = await db.departments.listDepartments();

    logger.info('Testing update department');
    const toBeUpdated = allDepts[0];
    toBeUpdated.name = 'OMG I GOT UPDATED DEPT';
    await db.departments.updateDepartment(toBeUpdated);
}

async function test() {
    await testUsers();
    await testDepartments();
}

module.exports = {
    test: test
}