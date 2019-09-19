"use strict";

const sqlite3 = require('sqlite3').verbose();
const DB_PATH = require('../../config').DB_PATH;
const logger = require('../logger');

let db = null;
let connecting = null;

async function connect(){
	if (connecting === null) {
		logger.info(`loading db from ${DB_PATH}`);
		// we need to load up the db
		connecting = new Promise((res, rej) => {
			const theDb = new sqlite3.Database(DB_PATH, (err) => {
				if (err) {
					logger.error(err.message);
					return rej(err);
				}
				logger.verbose('Connected to the database file.');
				return res(theDb);
			});
		});
	}
	db = await connecting;
	logger.info('db is loaded');
	return db;
}

async function run() {
    return new Promise((res, rej) => {
		db.run(...arguments, err => {
			return err ? rej(err) : res(true);
		});
	});
}

async function get() {
    return new Promise((res, rej) => {
		db.get(...arguments, (err, row) => {
			return err ? rej(err) : res(row);
		});
	});
}

async function all() {
    return new Promise((res, rej) => {
		db.all(...arguments, (err, rows) => {
			return err ? rej(err) : res(rows);
		});
	});
}

// async function createTables() {
//     // generate all the tables
//     await Promise.all(createStatements.map(e => {
//         return run(e);
//     }));
//     logger.info('db tables have been created');
// }


/*
getAllUsers()
addUser(user)
updateUser(user)
//banUser()

getAllProgramTypes
addProgramType(programType)
deleteProgramType(programType)

getAllTimeSlotsDefs
addTimeSlotDefs(timeslot)
delete
update

getAllTimeSlots
getTimeSlotRange
addTimeSlot
deleteTimeSlot
updateTimeSlot

addReservation
deleteReservation

signIn //attendence
*/

module.exports = {
	connect: connect,
	run: run,
	get: get,
	all: all,
};
