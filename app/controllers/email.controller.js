const Email = require('../models/email.model.js');

exports.sendEmail = (req, res) => {
    Email.sendEmail(req, (err, data) => {
        if(err){
            console.log("in controller error");
        }else{
            res.send(data);
        }
    })
}