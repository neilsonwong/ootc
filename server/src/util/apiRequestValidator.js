'use strict';

const moment = require('moment');

function validatePassword(password) {
    return (_isNonEmptyString(password)) ?
        null :
        'password is empty or not a string';
}

function validateUserCreation(user) {
    return (user &&
      _isNonEmptyString(user.email) &&
      _isNonEmptyString(user.fname) &&
      typeof user.mname === 'string' &&
      _isNonEmptyString(user.lname) &&
      _isGreaterThanZero(user.phone) &&
      typeof user.age === 'number' &&
      _isZeroOrGreater(user.experience) &&
      typeof user.comments === 'string' &&
      user.phone.toString().length === 10 &&
      user.age >= 18) ?
      null :
      'user is empty or not a valid user object for creation';
}

function validateUser(user) {
    return (user &&
      _isZeroOrGreater(user.id) &&
      _isNonEmptyString(user.email) &&
      _isNonEmptyString(user.fname) &&
      typeof user.mname === 'string' &&
      _isNonEmptyString(user.lname) &&
      _isGreaterThanZero(user.phone) &&
      typeof user.age === 'number' &&
      _isZeroOrGreater(user.experience) &&
      typeof user.comments === 'string' &&
      user.phone.toString().length === 10 &&
      user.age >= 18) ?
      null :
      'user is empty or not a valid user object';
}


function validateUserId(userId) {
    return (_isNonEmptyString(userId)) ?
        null :
        'userId is empty or not a string';
}

function validateResetCode(resetCode) {
    return (_isNonEmptyString(resetCode)) ?
        null :
        'resetCode is empty or not a string';
}

function validateValidationCode(validationCode) {
    return (_isNonEmptyString(validationCode)) ?
        null :
        'validationCode is empty or not a string';
}

function validateDepartmentId(dept) {
    return (_isZeroOrGreater(dept)) ?
        null :
        'deparmentId is not a number or less than 0';
}

function validateDepartmentName(name) {
    return (_isNonEmptyString(name)) ?
        null :
        'department name is empty or not a string';
}

function validateDepartmentDescription(desc) {
    return (_isString(desc)) ?
        null :
        'description is not a string';
}

function validateDepartment(dept) {
    return (dept &&
      _isZeroOrGreater(dept.id) &&
      _isNonEmptyString(dept.name) &&
      typeof dept.description === 'string') ?
      null :
      'department is empty or not a valid department object';
}

function validateReservationCreation(reservation) {
    return (reservation &&
        _isNonEmptyString(reservation.user) &&
        _isZeroOrGreater(reservation.timeSlot)) ?
        null :
        'reservation is empty or not a valid reservation object';
}

// function validateReservation(reservation) {
//     return (res &&
//         typeof reservation.id === 'number' &&
//         typeof reservation.user === 'number' &&
//         typeof reservation.timeSlot === 'number' &&
//         typeof reservation.attended === 'boolean' &&
//         reservation.id >= 0 &&
//         reservation.user >= 0 &&
//         reservation.timeSlot >= 0) ?
//         null :
//         'reservation is empty or not a valid reservation object';
// }

function validateReservationId(reservationId) {
    return (_isZeroOrGreater(reservationId)) ?
        null :
        'reservationId is not a number or less than 0';
}

function validateTimeSlotDefCreation(timeSlotDef) {
    return (timeSlotDef &&
        _isValidHHMM(timeSlotDef.startTime) &&
        _isZeroOrGreater(timeSlotDef.duration) &&
        _isZeroOrGreater(timeSlotDef.department) &&
        _isGreaterThanZero(timeSlotDef.signUpCap) &&
        _isNonEmptyString(timeSlotDef.desc) &&
        _isValidYYYYMMDD(timeSlotDef.repeatStartDate) &&
        _isZeroOrGreater(timeSlotDef.repeatCount) &&
        _isZeroOrGreater(timeSlotDef.repeatInterval) &&
        _isZeroOrGreater(timeSlotDef.repeatSkipEvery)) ?
        null :
        'timeSlotDef is empty or invalid timeSlotDef object';
}

function validateTimeSlotDef(timeSlotDef) {
    return (timeSlotDef &&
        _isZeroOrGreater(timeSlotDef.id) &&
        _isValidHHMM(timeSlotDef.startTime) &&
        _isZeroOrGreater(timeSlotDef.duration) &&
        _isZeroOrGreater(timeSlotDef.department) &&
        _isGreaterThanZero(timeSlotDef.signUpCap) &&
        _isNonEmptyString(timeSlotDef.desc) &&
        _isValidYYYYMMDD(timeSlotDef.repeatStartDate) &&
        _isZeroOrGreater(timeSlotDef.repeatCount) &&
        _isZeroOrGreater(timeSlotDef.repeatInterval) &&
        _isZeroOrGreater(timeSlotDef.repeatSkipEvery)) ?
        null :
        'timeSlotDef is empty or invalid timeSlotDef object';
}

function validateTimeSlotDefId(timeSlotDefId) {
    return (_isZeroOrGreater(timeSlotDefId)) ?
        null :
        'timeSlotDefId is not a number or less than 0';
}

function validateTimeSlotId(timeSlotId) {
    return (_isZeroOrGreater(timeSlotId)) ?
        null :
        'timeSlotId is not a number or less than 0';
}

function validateTimeSlot(timeSlot) {
    return (timeSlot &&
        _isZeroOrGreater(timeSlot.id) &&
        _isValidYYYYMMDD(timeSlot.startDate) &&
        _isValidHHMM(timeSlot.startTime) &&
        _isZeroOrGreater(timeSlot.duration) &&
        _isZeroOrGreater(timeSlot.department) &&
        _isGreaterThanZero(timeSlot.signUpCap) &&
        _isNonEmptyString(timeSlot.desc)) ?
        null :
        'timeSlot is empty or invalid timeSlot object';
}

function _isZeroOrGreater(obj) {

    return ((obj && typeof obj === 'number' && obj >= 0) ||
        (obj && typeof obj === 'string' && /^\d+$/.test(obj)));
}

function _isGreaterThanZero(obj) {
    return ((obj && typeof obj === 'number' && obj > 0) ||
        (obj && typeof obj === 'string' && /^[1-9]\d*$/.test(obj)));
}

function _isString(obj) {
    return (obj && typeof obj === 'string');
}

function _isNonEmptyString(obj) {
    return (obj && typeof obj === 'string' && obj.length > 0);
}

function _isValidYear(obj) {
    return (obj && typeof obj === 'string' && obj.length === 4 && /^\d{4}$/.test(obj));
}

function _isValidHHMM(obj) {
    return (obj && typeof obj === 'string' && obj.length === 5 && /^\d{1,2}:\d{2}$/.test(obj));
}

function _isValidYYYYMMDD(obj) {
    return (obj && moment(obj, 'YYYY-MM-DD').isValid());
}

function isValidYear(obj) {
    return _isValidYear(obj) ? null : 'invalid year passed in';
}

function isValidHHMM(obj) {
    return _isValidHHMM(obj) ? null : 'invalid time passed in';
}

function isValidYYYYMMDD(obj) {
    return _isValidYYYYMMDD(obj) ? null : 'invalid date passed in';
}


module.exports = {
    validatePassword: validatePassword,
    validateUser: validateUser,
    validateUserCreation: validateUserCreation,
    validateUserId: validateUserId,
    validateResetCode: validateResetCode,
    validateValidationCode: validateValidationCode,
    validateDepartmentId: validateDepartmentId,
    validateDepartmentName: validateDepartmentName,
    validateDepartmentDescription: validateDepartmentDescription,
    validateDepartment: validateDepartment,
    validateReservationCreation: validateReservationCreation,
    // validateReservation: validateReservation,
    validateReservationId: validateReservationId,
    validateTimeSlotDef: validateTimeSlotDef,
    validateTimeSlotDefCreation: validateTimeSlotDefCreation,
    validateTimeSlotDefId: validateTimeSlotDefId,
    validateTimeSlotId: validateTimeSlotId,
    validateTimeSlot: validateTimeSlot,

    isValidHHMM: isValidHHMM,
    isValidYYYYMMDD: isValidYYYYMMDD,
    isValidYear: isValidYear,
}
