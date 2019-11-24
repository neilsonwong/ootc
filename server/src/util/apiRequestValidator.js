'use strict';

const logger = require('../logger');

const moment = require('moment');

function validatePassword(password) {
    const valid = _isNonEmptyString(password);
    if (!valid) {
        logger.debug(password);
    }
    return valid ? null :
        'password is empty or not a string';
}

function validateUserCreation(user) {
    const valid = (user &&
        _isNonEmptyString(user.email) &&
        _isNonEmptyString(user.fname) &&
        _isString(user.mname) &&
        _isNonEmptyString(user.lname) &&
        _isGreaterThanZero(user.phone) &&
        typeof user.age === 'number' &&
        _isZeroOrGreater(user.experience) &&
        _isString(user.comments) &&
        user.phone.toString().length === 10 &&
        user.age >= 18);

    if (!valid) {
        logger.debug(user);
    }
    return valid ? null :
      'user is empty or not a valid user object for creation';
}

function validateUser(user) {
    const valid = (user &&
        _isZeroOrGreater(user.id) &&
        _isNonEmptyString(user.email) &&
        _isNonEmptyString(user.fname) &&
        _isString(user.mname) &&
        _isNonEmptyString(user.lname) &&
        _isGreaterThanZero(user.phone) &&
        typeof user.age === 'number' &&
        _isZeroOrGreater(user.experience) &&
        _isString(user.comments) &&
        user.phone.toString().length === 10 &&
        user.age >= 18);

    if (!valid) {
        logger.debug(user);
    }
    return valid ? null :
    'user is empty or not a valid user object';
}


function validateUserId(userId) {
    const valid = (_isNonEmptyString(userId));
    if (!valid) {
        logger.debug(userId);
    }
    return valid ? null : 'userId is empty or not a string';
}

function validateResetCode(resetCode) {
    const valid = (_isNonEmptyString(resetCode));
    if (!valid) {
        logger.debug(resetCode);
    }
    return valid ? null :
        'resetCode is empty or not a string';
}

function validateValidationCode(validationCode) {
    const valid = (_isZeroOrGreater(validationCode));
    if (!valid) {
        logger.debug(validationCode);
    }
    return valid ? null :
        'validationCode is empty or not a number';
}

function validateDepartmentId(dept) {
    const valid = (_isZeroOrGreater(dept));
    if (!valid) {
        logger.debug(dept);
    }
    return valid ? null :
        'deparmentId is not a number or less than 0';
}

function validateDepartmentName(name) {
    const valid = (_isNonEmptyString(name));
    if (!valid) {
        logger.debug(name);
    }
    return valid ? null :
        'department name is empty or not a string';
}

function validateDepartmentDescription(desc) {
    const valid = (_isString(desc));
    return valid ? null :
        'description is not a string';
}

function validateDepartment(dept) {
    const valid = (dept &&
      _isZeroOrGreater(dept.id) &&
      _isNonEmptyString(dept.name) &&
      typeof dept.description === 'string');
    if (!valid) {
        logger.debug(dept);
    }
    return valid ? null :
      'department is empty or not a valid department object';
}

function validateReservationCreation(reservation) {
    const valid = (reservation &&
        _isNonEmptyString(reservation.user) &&
        _isZeroOrGreater(reservation.timeSlot));
    if (!valid) {
        logger.debug(reservation);
    }
    return valid ? null :
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
    const valid = (_isZeroOrGreater(reservationId));
    if (!valid) {
        logger.debug(reservationId);
    }
    return valid ? null :
        'reservationId is not a number or less than 0';
}

function validateTimeSlotDefCreation(timeSlotDef) {
    const valid = (timeSlotDef &&
        _isValidHHMM(timeSlotDef.startTime) &&
        _isZeroOrGreater(timeSlotDef.duration) &&
        _isZeroOrGreater(timeSlotDef.department) &&
        _isGreaterThanZero(timeSlotDef.signUpCap) &&
        _isNonEmptyString(timeSlotDef.desc) &&
        _isValidYYYYMMDD(timeSlotDef.repeatStartDate) &&
        _isZeroOrGreater(timeSlotDef.repeatCount) &&
        _isZeroOrGreater(timeSlotDef.repeatInterval) &&
        _isZeroOrGreater(timeSlotDef.repeatSkipEvery));
    if (!valid) {
        logger.debug(timeSlotDef);
    }
    return valid ? null :
        'timeSlotDef is empty or invalid timeSlotDef object';
}

function validateTimeSlotDef(timeSlotDef) {
    const valid = (timeSlotDef &&
        _isZeroOrGreater(timeSlotDef.id) &&
        _isValidHHMM(timeSlotDef.startTime) &&
        _isZeroOrGreater(timeSlotDef.duration) &&
        _isZeroOrGreater(timeSlotDef.department) &&
        _isGreaterThanZero(timeSlotDef.signUpCap) &&
        _isNonEmptyString(timeSlotDef.desc) &&
        _isValidYYYYMMDD(timeSlotDef.repeatStartDate) &&
        _isZeroOrGreater(timeSlotDef.repeatCount) &&
        _isZeroOrGreater(timeSlotDef.repeatInterval) &&
        _isZeroOrGreater(timeSlotDef.repeatSkipEvery));
    if (!valid) {
        logger.debug(timeSlotDef);
    }
    return valid ? null :
        'timeSlotDef is empty or invalid timeSlotDef object';
}

function validateTimeSlotDefId(timeSlotDefId) {
    const valid = (_isZeroOrGreater(timeSlotDefId));
    if (!valid) {
        logger.debug(timeSlotDefId);
    }
    return valid ? null :
        'timeSlotDefId is not a number or less than 0';
}

function validateTimeSlotId(timeSlotId) {
    const valid = (_isZeroOrGreater(timeSlotId));
    if (!valid) {
        logger.debug(timeSlotId);
    }
    return valid ? null :
        'timeSlotId is not a number or less than 0';
}

function validateTimeSlot(timeSlot) {
    const valid = (timeSlot &&
        _isZeroOrGreater(timeSlot.id) &&
        _isValidYYYYMMDD(timeSlot.startDate) &&
        _isValidHHMM(timeSlot.startTime) &&
        _isZeroOrGreater(timeSlot.duration) &&
        _isZeroOrGreater(timeSlot.department) &&
        _isGreaterThanZero(timeSlot.signUpCap) &&
        _isNonEmptyString(timeSlot.desc));
    if (!valid) {
        logger.debug(timeSlot);
    }
    return valid ? null :
        'timeSlot is empty or invalid timeSlot object';
}

function _isZeroOrGreater(obj) {
    switch(typeof obj) {
        case 'string':
            return (/^\d+$/.test(obj));
        case 'number':
            return (obj >= 0);
        default:
            return false;
    }
}

function _isGreaterThanZero(obj) {
    switch(typeof obj) {
        case 'string':
            return (/^[1-9]\d*$/.test(obj));
        case 'number':
            return (obj > 0);
        default:
            return false;
    }
}

function _isString(obj) {
    return (typeof obj === 'string');
}

function _isNonEmptyString(obj) {
    return (typeof obj === 'string' && obj.length > 0);
}

function _isValidYear(obj) {
    return (typeof obj === 'string' && obj.length === 4 && /^\d{4}$/.test(obj));
}

function _isValidHHMM(obj) {
    return (typeof obj === 'string' &&
        (obj.length === 5 || obj.length === 4)
        && /^\d{1,2}:\d{2}$/.test(obj));
}

function _isValidYYYYMMDD(obj) {
    return (typeof obj === 'string' && moment(obj, 'YYYY-MM-DD').isValid());
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
