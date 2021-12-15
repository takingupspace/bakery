const { json } = require('body-parser');
const nodemailer = require('nodemailer');
const { getMaxListeners } = require('process');
require('dotenv').config();
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port : 465,
    secure : true,
    auth : {
        user: 't.r.s.pride@gmail.com',
        pass : 'letskEep29S4feOK?'
    }
})

message = {
    from: 't.r.s.pride@gmail.com',
    to: 't.r.s.pride@gmail.com',
    subject : 'Test Email',
    text: 'Hopefully this works so I can move on'
}

transporter.sendMail(message, function(err, info){
    if (err){
        console.log('message.from is ' + JSON.stringify(message))
        console.log(err);
    }else{
        console.log(info);
    }
})