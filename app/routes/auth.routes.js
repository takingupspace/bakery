module.exports = app => {
    const auth = require("../controllers/auth.controller.js");
    const {verify} = require('../../authorization.js');
    
    app.post('/login', auth.signIn);
    
    app.post('/signup', auth.signUp);
    
    };