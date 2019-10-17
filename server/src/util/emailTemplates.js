'use strict';

const TEMPLATES = {
    VERIFICATION: {
        subject: () => ('Out of the Cold - Email Verification'),
        text: generateVerificationEmail
    },
    REMINDER: {
        subject: (dept, date, startTime, endTime) => (`OOTC - REMINDER: ${dept}: ${date} ${startTime} - ${endTime}`),
        text: generateReminderEmail
    },
    SCHEDULE: {
        subject: () => 'OOTC - Schedule Confirmation',
        text: generateScheduleEmail
    }
};

function generateVerificationEmail(name, validationLink) {
    return `Hello ${name},

Thanks for signing up for an account with Out of the Cold. Please verify your address go going to the following link.
${validationLink}

Thank you for serving!

TCCC x Gibson - Out of the Cold`;
}

function generateReminderEmail(name, dept, date, startTime, endTime) {
    return `Hello ${name},

This is a reminder that you have signed up for:

${dept}: ${date} ${startTime} - ${endTime}

If you are sick on the day of your scheduled time slot, please DO NOT show  
up. We must make sure that other volunteers and guests do not get sick as  
well. If you show up sick, we will have to ask you to leave.

If you cannot attend for your time slot, please reply this email with your  
cancellation at least 24 hours in advance.

When you arrive at the registration table, please sign-in in the volunteer room using your email
address or by scanning your the QR code from your phone.

If you cannot attend your time slot, please reply this email with "CANCEL" to cancel your timeslot.

Thank you for serving!

TCCC x Gibson - Out of the Cold`;
}

function generateScheduleEmail(name, reservations) {
    const curYear = (new Date()).getFullYear();

    // reservations should be an array of ReservationView
    const reservationsString = reservations.map(reservation => {
        return `${reservation.department} ${reservation.startDate} ${reservation.startTime}: ${reservation.desc}`;
    }).join('\n');

return `Hello ${name},

This email is a confirmation of your sign-up for OOTC: <Dept>
Team of ${curYear} for the following weeks and timeslots:

${reservationsString}

Please mark off these time slots in your calendars if you have not done so  
yet. Weekly reminder emails will be sent a few days in advance for the time  
slots you have signed up for.

Thank you for serving!

TCCC x Gibson - Out of the Cold`;
}

module.exports = TEMPLATES;
