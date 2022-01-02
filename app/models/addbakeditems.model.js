const sql = require("./db.js");
const BakedItem = function(item){
    this.item_name = item.item_name;
    this.category = item.category;
    this.description = item.description;
    this.img_url = item.img_url;
}

BakedItem.createBakedItem = (req, result) => {
    sql.query(`INSERT INTO bake_items (item_name, category, description, img_url)
    VALUES('${req.item_name}', '${req.category}', '${req.description}', '${req.img_url}')`, (err, res) => {
        if(err){
            console.log("SQL error in add baked item model = " + err);
        }else{
            result(null, res);
        }
    })
}