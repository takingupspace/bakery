module.exports = app => {
    const bakedItems = require('../controllers/bakeitems.controller.js');

    app.get("/showAll", bakedItems.showAll)

    // we're going to need to use post since we have to send the filter data
    // i.e. the category that the customer requests, so that we can query
}