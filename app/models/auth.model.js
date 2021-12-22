const sql = require("./db.js");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSecret = "my-token-secret"
const rounds = 10
require('dotenv').config()

const Auth = function(auth){
    this.userName = auth.userName;
    this.password = auth.password;
    this.email = auth.email;
};

Auth.verifySession = (req, result) => {
    let checkAccessToken = req.body.email;
    console.log("checkAccessToken in Auth Model = " + checkAccessToken);
    sql.query(`SELECT session from customers c WHERE c.email = '${checkAccessToken}'`, (err, res) => {
        if(res[0] == null){
            return result("There is no session for this user or the user does not exist", null)
        }
        if(res[0] != null){
            return result(null, res[0].session)
        }
    })
}

Auth.createUser = (userName, password, firstName, lastName, result) => {
    bcrypt.hash(password, rounds, (error, hash) => {
        if (error) result(null, error)
        else {
            sql.query(`INSERT INTO customers (firstName, lastName, password, email) VALUES ('${firstName}', '${lastName}', '${hash}', '${userName}')`, (err, res) => {
                if(err){
                    console.log("This user already exists!");
                    result("This user already exists!", null);
                    return;
                }
                console.log("User entered into the customers table")
                result(null, res);
        });
    }
});

};

Auth.userLogin = (userName, password, result, cookie) => {
    sql.query(`SELECT email, password from customers c WHERE c.email = '${userName}'`, (err, res) => {
        if(err){
            console.log("error" + err);
            result(null, err);
            return
        }

        if(res[0] == null){
            return result("There is no user in the database with these credentials", null)
        }

        cookie = "asdfdsfdfdfdfa"
        bcrypt.hash(password, rounds, (error, hash) => {
            if (error) result(null, error)
        const match = bcrypt.compareSync(password, res[0].password)
        if(match){
            console.log("Passwords match, issuing a token")
            let payload = {userName : userName}
            let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: process.env.ACCESS_TOKEN_LIFE
            })
            let refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: process.env.REFRESH_TOKEN_LIFE
            })
            console.log("access token is = " + accessToken)
            sql.query(`UPDATE customers c SET session = '${accessToken}' WHERE c.email ='${userName}'`, (err, res) => {
                if(err){
                    console.log("error: couldn't add cookie to DB", err)
                }else{
                    console.log("cookie successfully added to DB")
                }
            })
            result(null, accessToken)
        }else{
            console.log('passwords did not match')
            result("passwords do not match", null)
        }
        
    })
})
}

module.exports = Auth;