const BakeItems = require('../models/bakeitems.model.js');

exports.showAll = (req, res) => {
    BakeItems.showAll(req, (err, data) => {
        if(err){
            console.log("error in bake items controller")
        }else{
            res.send(data);
        }
    })
}