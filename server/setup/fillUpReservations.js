'use strict';

const axios = require('axios');

const users = require('../default_users');

const SRC_EMAIL_NAME = 'tcccoutofthecoldexperimental';
const EMAIL_DOMAIN = '@gmail.com';

const API_URL = "http://localhost:8000";
const LOGIN_URL = `${API_URL}/api/v1/login`;
const GET_TIMESLOTS_URL = `${API_URL}/api/v1/admin/timeslots`;
const ADD_RESERVATIONS_URL = `${API_URL}/api/v1/admin/reserve`;
const CREATE_USER_URL = `${API_URL}/api/v1/register`;

let axiosConfig;

function* makeEmails() {
    let maxDots = SRC_EMAIL_NAME.length - 1;
    let max = Math.pow(2, maxDots);
    const splitUp = SRC_EMAIL_NAME.split('');
    for (let i = 0; i < max; ++i) {
        const binArray = dec2bin(i).padStart(maxDots, 0).split('');
        const joinMap = binArray.map(e => (e === "0" ? false:true));
        yield (splitUp.reduce((acc, cur, idx) => {
            return joinMap[idx] ? `${acc}.${cur}` : `${acc}${cur}`;
        }, '') + EMAIL_DOMAIN);
    }
}

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

const unlimitedEmails = makeEmails();

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

function getTimeSlots() {
    console.log('getting a list of all timeslots');
    try {
        return axios.get(GET_TIMESLOTS_URL, { params: {
                startDate:'2019-11-01',
                endDate:'2020-01-31'
            }, ...axiosConfig
        });
    }
    catch(e) {
        console.error('There was an error when getting all time slots');
        console.error(e);
    }
}

function setupReservations(reservations) {
    reservations.forEach(async (element) => {
        for (let i = 0; i < element.signUpCap; ++i) {
            console.log('adding reservation');
            try {
                const email = unlimitedEmails.next().value;
                await createUser(email);
                await axios.post(ADD_RESERVATIONS_URL, {
                    user: email,
                    timeSlot: element.id,
                    attended: false 
                }, axiosConfig);
            }
            catch(e) {
                console.error('There was an error adding the reservation');
                console.error(e);
            }
        }
    });
}

async function createUser(email) {
    console.log(`creating user ${email}`);
    try {
        await axios.post(CREATE_USER_URL, {
                user: {
                email: email,
                fname: 'string',
                mname: 'string',
                lname: 'string',
                phone: 4161111111,
                age: 20,
                experience: 2,
                comments: 'string'
            },
            password: 'password'
        }, axiosConfig);
    }
    catch(e) {
        console.log('error creating user');
        console.log(e);
    }
}

async function main() {
    await authenticate();
    let timeSlots = await getTimeSlots();
    await setupReservations(timeSlots.data);
}

main();
