"use strict";

const sqlite3 = require('sqlite3').verbose();
const DB_PATH = require('../../config').DB_PATH;
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

module.exports = {
	connect: connect
};
