module.exports = app => {
    const addBakedItem = require("../controllers/addbakeditems.controller.js");

    app.post('addBakedItem', addBakedItem.addItem);
}