const BakeItems = require('../models/bakeitems.model.js');

exports.showAll = (req, res) => {
    BakeItems.showAll(req, (err, data) => {
        if(err){
            console.log("error in showAll method within bake items controller: ", err)
        }else{
            res.send(data);
        }
    })
}

exports.showCategory = (req,res) => {
    BakeItems.showSpecificCategory(req, (err ,data) => {
    if(err){
        console.log("error in showCategory within bake items controller", err)
    }else{
        res.send(data);
    }
    })
}