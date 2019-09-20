'use strict';

const assert = require('assert');
const db = require('./db');
const logger = require('../logger');

const User = require('../models/User');
const TimeSlotDefinition = require('../models/TimeSlotDefinition');
const TimeSlot = require('../models/TimeSlot');
const Reservation = require('../models/Reservation');

async function testUsers() {
    logger.info('Running tests for Users');
    
    logger.info('Testing user creation');
    const email = `a_${Date.now()}@b.com`;

    const a = new User(email, email, 'a-fname', 'a-mname', 'a-lname', '416-123-4567', 99, '', '', false, false);

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
    assert(allDepts.length === 3);

    logger.info('Testing update department');
    const toBeUpdated = allDepts[0];
    toBeUpdated.name = 'OMG I GOT UPDATED DEPT';
    await db.departments.updateDepartment(toBeUpdated);

    const allDepts2 = await db.departments.listDepartments();
    assert(allDepts2[0].name === 'OMG I GOT UPDATED DEPT');
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

    const allDepts = await db.departments.listDepartments();
    const schedFrag = new TimeSlotDefinition(undefined, 2, 1600, 150, allDepts[0].id, 10, 2019);
    const schedFrag2 = new TimeSlotDefinition(undefined, 2, 1200, 120, allDepts[1].id, 5, 2019);
    const schedFrag3 = new TimeSlotDefinition(undefined, 2, 1600, 150, allDepts[0].id, 10, 2018);
    const schedFrag4 = new TimeSlotDefinition(undefined, 2, 1200, 120, allDepts[1].id, 5, 2018);

    logger.info('Inserting Time Slot Definitions');
    await db.timeSlotDefs.insertTimeSlotDef(schedFrag);
    await db.timeSlotDefs.insertTimeSlotDef(schedFrag2);
    await db.timeSlotDefs.insertTimeSlotDef(schedFrag3);
    await db.timeSlotDefs.insertTimeSlotDef(schedFrag4);

    logger.info('Testing List Time Slot Defs');
    const yearDefs2019 = await db.timeSlotDefs.listTimeSlotDefsForYear(2019);
    const yearDefs2018 = await db.timeSlotDefs.listTimeSlotDefsForYear(2018);
    assert(yearDefs2018.length === 2);
    assert(yearDefs2019.length === 2);

    logger.info('Testing List Time Slot Def Deletion');
    const toBeDeletedId = yearDefs2018[0].id;
    await db.timeSlotDefs.deleteTimeSlotDef(toBeDeletedId);

    logger.info('Testing List Time Slot Def update');
    const toBeUpdated = yearDefs2019[1];
    toBeUpdated.dayOfWeek = 5;
    toBeUpdated.startTime = 2000;
    toBeUpdated.duration = 20;
    toBeUpdated.department = allDepts[2].id;
    toBeUpdated.signUpCap = 100;
    toBeUpdated.year = 2017;
    await db.timeSlotDefs.updateTimeSlotDef(toBeUpdated);

    const defs2019 = await db.timeSlotDefs.listTimeSlotDefsForYear(2019);
    const defs2018 = await db.timeSlotDefs.listTimeSlotDefsForYear(2018);
    const defs2017 = await db.timeSlotDefs.listTimeSlotDefsForYear(2017);
    assert(defs2019.length === 1);
    assert(defs2018.length === 1);
    assert(defs2017.length === 1);
}

async function testTimeSlots() {
    logger.info('Running some tests for TimeSlot');

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
        await testTimeSlots();
        await testReservations();
    }
    catch(e) {
        logger.error('error when testing db');
        logger.error(e);
    }
}

module.exports = {
    test: test
}