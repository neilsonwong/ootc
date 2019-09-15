module.exports = [
    `CREATE TABLE IF NOT EXISTS users (
        id INTEGER,
        fname TEXT NOT NULL,
        mname TEXT,
        lname TEXT NOT NULL,
        email TEXT NOT NULL,
        phone CHAR(10),
        age INTEGER NOT NULL,
        experience INTEGER,
        comments TEXT,
        validate INTEGER,
        admin INTEGER
    )`,
    `CREATE TABLE IF NOT EXISTS timeSlotDef (
        dayOfWeek INTEGER,
        startTime  INTEGER,
        duration INTEGER,
        signUpCap INTEGER,
        year INTEGER
    )`,
    `CREATE TABLE IF NOT EXISTS timeSlots (
        id INTEGER,
        datetime INTGER,
        duration INTEGER,
        signUpCap INTEGER
    )`,
    `CREATE TABLE IF NOT EXISTS reservations (
        userId INTEGER,
        timeSlot INTEGER,
        attended INTEGER
    )`,
    `CREATE TABLE IF NOT EXISTS programType (
        programType TEXT
    )`
];
