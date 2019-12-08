'use strict';

const axios = require('axios');

const DEPARTMENTS = require('./departmentsDefs');
const TIMESLOTS = require('./timeSlotDefs');

const users = require('../default_users');

const API_URL = "http://localhost:8000";
const LOGIN_URL = `${API_URL}/api/v1/login`;
const ADD_DEPT_URL = `${API_URL}/api/v1/admin/departments/add`;
const ADD_TIMESLOT_URL = `${API_URL}/api/v1/admin/schedule/add`;
const GENERATE_TIMESLOT_URL = `${API_URL}/api/v1/admin/schedule/generate`;

let axiosConfig;

function setAuthHeader(token) {
    if (token) {
        axiosConfig = {
            headers: {
                Authorization: "Bearer " + token
            }
        };
        console.log('Auth token is set');
    }
    else {
        console.error('Cannot set the auth token as a falsy value');
    }
}

async function authenticate() {
    console.log('authenticating with superuser');
    if (users && users.superadmin && users.superadmin.length > 0) {
        try {
            const superadmin = users.superadmin[0];
            console.log(`authenticating with superuser: ${superadmin.id}`);

            const authContext = await axios.post(LOGIN_URL, {
                userId: superadmin.id, password: superadmin.password
            });

            // save the as the auth header
            setAuthHeader(authContext.data.token);
        }
        catch (e) {
            console.error('Unable to login');
            console.error(e);
        }
    }
    else {
        console.error('Unable to find a superadmin account definition with the default users file');
    }
}

async function setupDepartments() {
    console.log('Adding departments using the following url');
    console.log(ADD_DEPT_URL);

    // we want this to run in series to ensure the dept id's match lol (bad/lazy stuff)
    try {
        for (const dept of DEPARTMENTS) {
            console.log(`Adding department ${dept.departmentName}`);
            await axios.post(ADD_DEPT_URL, dept, axiosConfig);
            console.log(`${dept.departmentName} was successfully added`);
        }
    }
    catch(e) {
        console.error('There was an error when adding the departments');
        // console.error(e);
    }
}

async function setupTimeSlotDefs() {
    console.log('Adding Time Slot Definitions using the following url');
    console.log(ADD_TIMESLOT_URL);

    // we want this to run in series to ensure the dept id's match lol (bad/lazy stuff)
    try {
        for (let i = 0; i < TIMESLOTS.length; ++i) {
            await axios.post(ADD_TIMESLOT_URL, TIMESLOTS[i], axiosConfig);
            console.log(`Added Time Slot Def ${i+1}/${TIMESLOTS.length}`);
        }
    }
    catch(e) {
        console.error('There was an error when adding the time slot defs');
        console.error(e);
    }
}

async function generateTimeSlots() {
    console.log('Generating Time Slot based on Time Slot Definitions using the following url');
    console.log(GENERATE_TIMESLOT_URL);

    // we want this to run in series to ensure the dept id's match lol (bad/lazy stuff)
    try {
        for (let i = 0; i < TIMESLOTS.length; ++i) {
            await axios.post(GENERATE_TIMESLOT_URL, TIMESLOTS[i], axiosConfig);
            console.log(`Generated Time Slots for Time Slot Def ${i+1}/${TIMESLOTS.length}`);
        }
    }
    catch(e) {
        console.error('There was an error when generating the time slot');
        console.error(e);
    }
}

async function main() {
    await authenticate();
    await setupDepartments();
    await setupTimeSlotDefs();
    await generateTimeSlots();
}

main();
