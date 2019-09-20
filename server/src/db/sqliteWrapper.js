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
		// don't use arrow function here, as sqlite binds an object to 
		// 'this' containing rowId for inserts *** VERY USEFUL ***
		db.run(...arguments, function(err) {
			return err ? rej(err) : res(filterInvalid(this));
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

// https://github.com/mapbox/node-sqlite3/wiki/API#databaserunsql-param--callback
function filterInvalid(runResult) {
	const trimmedSql = runResult.sql.trim();
	if (trimmedSql.startsWith('INSERT')) {
		return { lastID: runResult.lastID };
	}
	else if (trimmedSql.startsWith('UPDATE') || trimmedSql.startsWith('DELETE')) {
		return { changes: runResult.changes };
	}
	return null;
}

module.exports = {
	connect: connect,
	run: run,
	get: get,
	all: all,
};
