module.exports = app => {
const email = require('../controllers/email.controller.js');

app.post("/sendEmail", email.sendEmail);

}