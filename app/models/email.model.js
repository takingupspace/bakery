const sql = require('./db.js');
const nodemailer = require('nodemailer');
const creds = require('../models/creds.js');

const Email = function(email){
    this.name = email.name;
    this.email = email.email;
    this.message = email.message;
}

Email.sendEmail = (req, result) => {
    // create smtp tunnel
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure : true,
        auth : {
            user : creds.EMAIL,
            pass : creds.PASS
        }
    });

    // next create our message
    message = {
        from : req.body.email,
        to : creds.EMAIL,
        subject : 'Customer wishes to get in contact',
        text : `Customer name is ${req.body.name} and the message they sent is ${req.body.message}`
    }

    // lastly, we use our smtp portal to send our message
    transporter.sendMail(message, function(err, data){
        if(err){
            console.log(err);
            result(err, null);
        }else{
            console.log(data);
            result(null, data);
        }
    })
}

module.exports = Email;