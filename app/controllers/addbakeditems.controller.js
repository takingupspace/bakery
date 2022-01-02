const BakedItem = require("../models/addbakeditems.model.js");

exports.addItem = (req, res) => {
    BakedItem.createBakedItem(req, (err, data) => {
        if(err){
            console.log("Error in add baked item controller");
            res.send({
                message : "An error occured when trying to add a baked item to the database"
            })
        }else{
            console.log("Successfully added the baked item to the database");
            res.send({
                message : "You have successfully added " + req.body.item_name + " to the database"
            })
        }
    })
}