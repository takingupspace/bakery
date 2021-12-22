const Auth = require("../models/auth.model.js");
const jwt = require('jsonwebtoken')
const tokenSecret = "my-token-secret"

exports.signUp = (req, res) => {
    Auth.createUser(req.body.userName, req.body.password, req.body.firstName, req.body.lastName, (err, data) => {
        if(err){
            res.send({
                message : "This user already exists!"
            })
        }else res.send({
            message : `Thank you ${req.body.userName}, you have successfully signed up!`
        });
    });
}

exports.signIn = (req, res) => {
    Auth.userLogin(req.body.userName, req.body.password, (err, data) => {
        if(err){
                res.send({
                    message: "Passwords do not Match or no User with that name on file"
                });
            }else{

            res.cookie("jwt", data, {secure: true, httpOnly: false, maxAge : 60, SameSite: true})
            userName = req.body.userName
            res.send({
                message: `Passwords Match ${req.body.userName}, issuing a token`,
                data : data,
                userName : userName
        });
        }
    })
}

exports.verify = (req, res, next) => {
    Auth.verifySession(req, (err, data) => {
        console.log("req.body inside Auth controller = " + JSON.stringify(req.body));
        if(err){
            res.send({
                message : "This user doesn't exist, or there is no valid token!",
                roomId : req.body.roomId
            })
            console.log("error before next call in verify")
        }else{
            // TODO: Add response from server to client, but it's probably going to be just passing flow to the next function with next(), right?
            console.log("inside verify controller after verifySession Auth model has returned: session is = " + (data))
            try{
                
                // now we verify the token
                payload = jwt.verify(data, process.env.ACCESS_TOKEN_SECRET)
                console.log("payload is " + JSON.stringify(payload))
                next()
            }catch(e){
                console.log("catch was activated")
            }
                if(req.body.isBooked == 1){
                  sendData = "Successfully added the booking for this client!"
                }else{
                  sendData = "Successfully removed the booking for this client!"
                }           
            console.log("inside verify controller after verifySession Auth Model returns")
            next()
        }
    });
}