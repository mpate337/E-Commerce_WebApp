var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define collection and schema for Items
var ItemSchema = new Schema({
  item_name: {
    type: String
  },
  item_price: {
    type: Number
  },
  item_quantity: {
    type: Number
  },
  item_tax: {
    type: Number
  }
},{
    collection: 'items'
});

const Item = module.exports = mongoose.model('Item', ItemSchema);

module.exports.addItem = function(item, callback){
    item.save(callback)
}

module.exports.getItems = function(item, res){
  Item.find(function (err, items){
    if(err){
      console.log(err);
    }
    else {
      res.json(items);
    }
  });
}