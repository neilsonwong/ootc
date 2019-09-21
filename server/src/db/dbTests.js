'use strict';

const assert = require('assert');
const db = require('./db');
const logger = require('../logger');

const User = require('../models/User');
const TimeSlotDefinition = require('../models/TimeSlotDefinition');
const TimeSlot = require('../models/TimeSlot');
const Reservation = require('../models/Reservation');
const RepeatIntervalEnum = require('../models/RepeatIntervalEnum');

async function testUsers() {
    logger.info('Running tests for Users');
    
    logger.info('Testing user creation');
    const testAdmin = newTestUser('foo', 'foo@bar.com');
    const { email } = await db.users.insertUser(testAdmin);
    await db.users.insertUser(newTestUser());
    await db.users.insertUser(newTestUser());

    logger.info('Testing list users');
    const alls = await db.users.listUsers();
    assert(alls.length === 3);

    logger.info('Testing get user');
    let admin = await db.users.getUser(email);
    assert(JSON.stringify(admin) === JSON.stringify(testAdmin));

    logger.info('Testing user validation');
    await db.users.validateUser(email);
    admin = await db.users.getUser(email);
    assert(admin.validated === 1);

    logger.info('Testing user update admin status');
    await db.users.updateAdminStatus(email, true);
    admin = await db.users.getUser(email);
    assert(admin.admin === 1);

    logger.info('Testing user update other fields');
    await db.users.updateUser(Object.assign({}, new User(email, email, 'admin-fname', 'admin-mname', 'admin-lname', '1800EZPZ4ME', 6, 'hello', 'world', 0, 0)));
    admin = await db.users.getUser(email);
    assert('1800EZPZ4ME' === admin.phone);
}

async function testDepartments() {
    logger.info('Running tests for Departments');
    
    logger.info('Testing department creation');
    await db.departments.insertDepartment('Dept A');
    await db.departments.insertDepartment('Dept B');
    await db.departments.insertDepartment('Dept C');

    logger.info('Testing list departments');
    const allDepts = await db.departments.listDepartments();
    assert(allDepts.length === 3);

    logger.info('Testing update department');
    const toBeUpdated = allDepts[0];
    toBeUpdated.name = 'OMG I GOT UPDATED DEPT';
    await db.departments.updateDepartment(toBeUpdated);

    const allDepts2 = await db.departments.listDepartments();
    const updatedVal = allDepts2.filter(e => e.id === toBeUpdated.id)[0];
    assert(updatedVal.name === 'OMG I GOT UPDATED DEPT');
}

async function testPasswords() {
    logger.info('Adding test users for password tests');

    //make some fake dudes
    const domain = '@helloworld.com';
    const fakeEmails = ['Tommy', 'Bob', 'Joe'].map(e => `${e}${domain}`);
    await Promise.all(fakeEmails.map(e => db.users.insertUser(newTestUser(e.slice(0, -domain.length), e))));

    logger.info('Running some tests for Passwords');

    logger.info('Adding fake passwords');
    await Promise.all(fakeEmails.map(e => {
        return db.passwords.insertPassword(e, `password_for_${e}`);
    }));

    logger.info('Check fake passwords');
    const dummyPasswords = await Promise.all(fakeEmails.map(e => {
        return db.passwords.getPassword(e)
    }));
    assert(dummyPasswords.reduce((acc, cur) => {
        return acc && cur.startsWith('password_for_')}));

    logger.info('Update fake passwords');
    await Promise.all(fakeEmails.map(e => {
        return db.passwords.updatePassword(e, `la_password_pour_${e}`);
    }));

    const dummyPasswords2 = await Promise.all(fakeEmails.map(e => {
        return db.passwords.getPassword(e)
    }));

    assert(dummyPasswords2.reduce((acc, cur) => acc &&
        cur.startsWith('la_password_pour_')));
}

async function testTimeSlotDefs() {
    logger.info('Running some tests for TimeSlotDefs');

    logger.info('Inserting Time Slot Definitions');
    await db.timeSlotDefs.insertTimeSlotDef(await newTestTimeSlotDef('14:00', '2019-09-18', 10, RepeatIntervalEnum.WEEKLY));
    await db.timeSlotDefs.insertTimeSlotDef(await newTestTimeSlotDef('16:00', '2019-09-19', 10, RepeatIntervalEnum.WEEKLY));
    await db.timeSlotDefs.insertTimeSlotDef(await newTestTimeSlotDef('18:00', '2019-09-20', 10, RepeatIntervalEnum.WEEKLY));
    await db.timeSlotDefs.insertTimeSlotDef(await newTestTimeSlotDef('08:00', '2019-01-01', 10, RepeatIntervalEnum.MONTHLY));

    const toBeUpdated = await db.timeSlotDefs.insertTimeSlotDef(await newTestTimeSlotDef('08:00', '2019-09-21', 10, RepeatIntervalEnum.WEEKLY));
    const toBeDeleted = await db.timeSlotDefs.insertTimeSlotDef(await newTestTimeSlotDef('08:00', '2019-01-01', 10, RepeatIntervalEnum.YEARLY));

    await db.timeSlotDefs.insertTimeSlotDef(await newTestTimeSlotDef('14:00', '2018-02-18', 10, RepeatIntervalEnum.WEEKLY));
    await db.timeSlotDefs.insertTimeSlotDef(await newTestTimeSlotDef('14:00', '2018-02-17', 10, RepeatIntervalEnum.WEEKLY));

    logger.info('Testing List Time Slot Defs');
    let yearDefs2019 = await db.timeSlotDefs.listTimeSlotDefsForYear(2019);
    const yearDefs2018 = await db.timeSlotDefs.listTimeSlotDefsForYear(2018);
    assert(yearDefs2018.length === 2);
    assert(yearDefs2019.length === 6);

    logger.info('Testing Time Slot Def Deletion');
    await db.timeSlotDefs.deleteTimeSlotDef(toBeDeleted.id);
    yearDefs2019 = await db.timeSlotDefs.listTimeSlotDefsForYear(2019);
    assert(yearDefs2019.length === 5);
    const filterDeleted = yearDefs2019.filter(e => e.id === toBeDeleted.id);
    assert(filterDeleted.length === 0);

    logger.info('Testing Time Slot Def update');
    toBeUpdated.startTime = 2000;
    toBeUpdated.duration = 20;
    toBeUpdated.department = 
    toBeUpdated.signUpCap = 100;
    toBeUpdated.repeatStartDate = '2017-01-01';
    toBeUpdated.repeatCount = 99;
    toBeUpdated.repeatInterval = RepeatIntervalEnum.YEARLY;
    toBeUpdated.repeatSkipEvery = 1;
    await db.timeSlotDefs.updateTimeSlotDef(toBeUpdated);

    const defs2017 = await db.timeSlotDefs.listTimeSlotDefsForYear(2017);
    assert(defs2017.length === 1);
    assert(defs2017[0].repeatStartDate === '2017-01-01');

    const defs2019 = await db.timeSlotDefs.listTimeSlotDefsForYear(2019);
    const defs2018 = await db.timeSlotDefs.listTimeSlotDefsForYear(2018);
    assert(defs2018.length === 2);
    assert(defs2019.length === 4);
}

async function testTimeSlots() {
    logger.info('Running some tests for TimeSlot');

    // we should have enough to gen
    const allDepts = await db.departments.listDepartments();
    const schedFrag = new TimeSlotDefinition(undefined, 2, 1600, 150*60*1000, allDepts[0].id, 10, 2019);
    const schedFrag2 = new TimeSlotDefinition(undefined, 5, 1200, 120*60*1000, allDepts[1].id, 5, 2019);

    await db.timeSlotDefs.insertTimeSlotDef(schedFrag);
    await db.timeSlotDefs.insertTimeSlotDef(schedFrag2);

    const yearDefs2019 = await db.timeSlotDefs.listTimeSlotDefsForYear(2019);

    const now = Date.now();
    const ts = new TimeSlot(undefined, now, yearDefs2019[0].id);
    const ts2 = new TimeSlot(undefined, now + 100000, yearDefs2019[1].id);
    const ts3 = new TimeSlot(undefined, now + 200000, yearDefs2019[1].id);
    const ts4 = new TimeSlot(undefined, now + 300000, yearDefs2019[1].id);

    logger.info('Inserting Time Slots');
    await db.timeSlots.insertTimeSlot(ts);
    await db.timeSlots.insertTimeSlot(ts2);
    await db.timeSlots.insertTimeSlot(ts3);
    await db.timeSlots.insertTimeSlot(ts4);

    logger.info('Listing all Time Slots in a range');
    const someSlots = await db.timeSlots.listTimeSlotsByRange(now + 1, now + 250000);
    assert(someSlots.length === 2);

    logger.info('Delete a time Slot');
    await db.timeSlots.deleteTimeSlot(someSlots[1].id);

    logger.info('Archive a time Slot');
    await db.timeSlots.archiveTimeSlot(someSlots[0].id);

    logger.info('Listing all Time Slots');
    const allSlots = await db.timeSlots.listTimeSlots();
    assert(allSlots.length === 3);
}

async function testReservations() {
    logger.info('Running some tests for Reservations');

    const allUsers = await db.users.listUsers();
    const user = allUsers[0];
    const allTimeSlots = await db.timeSlots.listTimeSlots();

    logger.info('Inserting Reservations');
    const reservation1 = new Reservation(undefined, user.id, allTimeSlots[0].id, false);
    const reservation2 = new Reservation(undefined, user.id, allTimeSlots[1].id, false);
    const reservation3 = new Reservation(undefined, user.id, allTimeSlots[2].id, false);
    const reservation4 = new Reservation(undefined, allUsers[1].id, allTimeSlots[1].id, false);

    await db.reservations.insertReservation(reservation1);
    await db.reservations.insertReservation(reservation2);
    await db.reservations.insertReservation(reservation3);
    await db.reservations.insertReservation(reservation4);

    logger.info('Get Reservation By UserId');
    const reservations = await db.reservations.getReservationsByUserId(user.id);
    assert(reservations.length === 3);

    logger.info('Deleting Reservations');
    await db.reservations.deleteReservation(reservations[0].id);

    logger.info('Find reservations for user')
    const reservation = await db.reservations.findReservationByUserAndTime(user.id, Date.now());

    logger.info('Update attendance for Reservation');
    await db.reservations.updateReservationAttendance(reservation.id, true);

    logger.info('Get Reservation By TimeSlot');
    const slotReservations = await db.reservations.getReservationsByTimeSlot(reservations[1].timeSlot);
    assert(slotReservations.length === 2);
}

async function test() {
    try {
        await testUsers();
        await testDepartments();
        await testPasswords();
        await testTimeSlotDefs();
        // await testTimeSlots();
        // await testReservations();
    }
    catch(e) {
        logger.error('error when testing db');
        logger.error(e);
    }
}

// utility functions 
function newTestUser(name, email) {
    name = name || `a_${Math.floor(Math.random()*1000000)}`;
    email = email || `${name}@b.com`;
    return Object.assign({}, new User(email, email, `f-${name}`, `m-${name}`, `l-${name}`, '416' + Math.floor(Math.random()*1000) + Math.floor(Math.random()*10000), Math.floor(Math.random()*100), '', '', 0, 0));
}

async function newTestTimeSlotDef(time, date, count, repeatInterval) {
    return Object.assign({}, new TimeSlotDefinition(null, time, 2, (await randomDept()).id, 10, date, count, repeatInterval, 0));
}

async function randomDept() {
    const allDepts = await db.departments.listDepartments();
    return allDepts[Math.floor(Math.random() * allDepts.length)];
}


module.exports = {
    test: test
}