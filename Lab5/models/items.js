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
  },
  item_desc: {
    type: String
  },
  item_freq: {
    type: Number,
    default: 0
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
  Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      item.save(callback).then(item => {
        res.json('Update complete');
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      });
    }
  });
}