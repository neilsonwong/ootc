'use strict';
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
async function main() {

    // Gmail SMTP
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: 'tccc.ootc@gmail.com', // sender address
        to: 'timmaaaayycheng@gmail.com', // list of receivers
        subject: 'REMINDER EMAIL', // Subject line
        html: '<b>This is a test but we need to inject names, etc later</b>' // html body
    };

    transporter.sendMail(mailOptions, function(err, data){
        if (err){
            console.log('Error Occured:', err);
        } else{
            console.log('Success!');
        }
    });
}

main().catch(console.error);