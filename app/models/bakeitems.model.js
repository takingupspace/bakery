const sql = require('./db.js');
const BakeItems = function(items){
    this.item_name = items.item_name;
    this.category = items.category;
    this.descritpion = items.descritpion;
    this.img_url = items.img_url;
}

BakeItems.showAll = (req, result) => {
    sql.query("SELECT * FROM bake_items", (err, res) => {
        if(err){
            console.log("err inside showAll-bakeitem model");
            result(err, null);
            return;
        }else{
            console.log("baked items are: ", res);
            result(null, res);
        }
    })
}

BakeItems.showSpecificCategory = (req, result) => {
    sql.query(`SELECT * FROM bake_items WHERE category = '${req.body.category}'`, (err, res) => {
        if(err){
            console.log("err inside showSpecificCategory bake item model");
            result(err, null);
            return;
        }else{
            console.log("baked items for this category are: ", res);
            result(null, res);
        }
    })
}

module.exports = BakeItems;