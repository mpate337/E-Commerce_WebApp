var mongoose = require('mongoose');
var url = require('url');
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

module.exports.updateItem = function(item, req, callback){
  // console.log(callback,"callback", url.URL)
  Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      // item.item_name = req.body.item_name;
      // item.item_price = req.body.item_price;
      // item.item_quantity = req.body.item_quantity;
      // item.item_tax = req.body.item_tax;

      item.save(callback).then(item => {
        res.json('Update complete');
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      });
    }
  });
}