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

async function testPasswords() {
    logger.info('Running some tests for Passwords');

    //make some fake dudes
    const fakeEmails = ['dummy1@helloworld.com', 'dummy2@helloworld.com', 'dummy3@helloworld.com'];
    const dummyUser = (email => (new User(email, email, 'a-fname', 'a-mname', 'a-lname', '416-123-4567', 99, '', '', false, false)));
    await Promise.all(fakeEmails.map(e => db.users.insertUser(dummyUser(e))));

    logger.info('Adding fake passwords');
    await Promise.all(fakeEmails.map(e => {
        return db.passwords.insertPassword(e, `password_for_${e}`);
    }));

    logger.info('Check fake passwords');
    const dummyPasswords = await Promise.all(fakeEmails.map(e => {
        return db.passwords.getPassword(e)
    }));

    console.log(dummyPasswords);

    logger.info('Update fake passwords');
    await Promise.all(fakeEmails.map(e => {
        return db.passwords.updatePassword(e, `la_password_pour_${e}`);
    }));

    const dummyPasswords2 = await Promise.all(fakeEmails.map(e => {
        return db.passwords.getPassword(e)
    }));

    console.log(dummyPasswords2);
}

async function test() {
    await testUsers();
    await testDepartments();
    await testPasswords();
}

module.exports = {
    test: test
}