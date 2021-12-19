const Email = require('../models/email.model.js');

exports.sendEmail = (req, res) => {
    Email.sendEmail(req, (err, data) => {
        if(err){
            console.log("error in email controller");
        }else{
            res.send(data);
        }
    })
}