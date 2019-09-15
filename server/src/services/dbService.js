"use strict";

const sqlite3 = require('sqlite3').verbose();
const DB_PATH = require('../../config').DB_PATH;
const createStatements = require('../sql/createStatements');
const logger = require('../logger');

let db = null;

async function connect(){
	logger.info(`loading db from ${DB_PATH}`);
	if (db !== null && db !== undefined) {
		return Promise.resolve(db);
	}
	else {
		return new Promise((res, rej) => {
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
}

async function run() {
    return new Promise((res, rej) => {
		db.run(...arguments, err => {
			return err ? rej(err) : res(true);
		});
	});
}

async function init() {
    db = await connect();
    await createTables();
}

async function createTables() {
    // generate all the tables
    await Promise.all(createStatements.map(e => {
        return run(e);
    }));
    logger.info('db tables have been created');
}

// basic
async function getUser(email) {

}

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

//

module.exports = {
    init: init
};
