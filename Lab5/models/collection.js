const mongoose = require('mongoose');
const config = require('../config/database');

//CollectionSchema
const CollectionSchema = mongoose.Schema({
    item_name: {
      type: String,
    },
    item_price: {
        type: Number,
    },
    user_id: {
        type: String,
    },
    private: {
        type: Boolean,
    },
    description: {
        type: String
    }
    },{
        collection: 'collection'
    });


const Collection = module.exports = mongoose.model('Collection', CollectionSchema);

module.exports.addItem = function(item, callback){
    item.save(callback)
}
