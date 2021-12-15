require('dotenv').config()
const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port : 465,
    secure : true,
    auth : {
        type: 'OAuth2',
        user: process.env.EMAIL_TO,
        pass : process.env.PASS
    }
})

message = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject : 'Test Email',
    text: 'Hopefully this works so I can move on'
}

transporter.sendMail(message, function(err, info){
    if (err){
        console.log(err);
    }else{
        console.log(info);
    }
})