const sql = require("./db.js");
const BakedItem = function(item){
    this.item_name = item.item_name;
    this.category = item.category;
    this.description = item.description;
    this.img_url = item.img_url;
}

BakedItem.createBakedItem = (req, result) => {
    sql.query(`INSERT INTO bake_items (item_name, category, description, img_url)
    VALUES('${req.body.item_name}', '${req.body.category}', '${req.body.description}', '${req.body.img_url}')`, (err, res) => {
        if(err){
            console.log("SQL error in add baked item model = " + err);
        }else{
            console.log("the result of sql in add baked item is " + JSON.stringify(res))
            result(null, res);
        }
    })
}

module.exports = BakedItem