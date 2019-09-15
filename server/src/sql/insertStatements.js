module.exports = [
    `INSERT INTO volunteers ( id, fname, mname, lname, email, phone, age, experience, comments, validate, admin)
    VALUES($id, $fname, $mname, $lname, $email, $phone, $age, $experience, $comments, $validate, $admin)`,
    `INSERT INTO timeSlotDef ( dayOfWeek, startTime, duration, signUpCap)
    VALUES($dayOfWeek, $startTime, $duration, $signUpCap)`,
    `INSERT INTO timeSlots (id, datetime, duration, signUpCap)
    VALUES($id, $datetime, $duration, $signUpCap)`,
    `INSERT INTO reservations (userid, timeSlot, attended)
    VALUES($userid, $timeSlot, $attended)`,
    `INSERT INTO programType (programType)
    VALUES($programType)`
];
