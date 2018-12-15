const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//adminSchema
const AdminSchema = mongoose.Schema({
    admin_username: {
      type: String,
      required: true
    },
    admin_password: {
      type: String,
      required: true
    }
    },{
        collection: 'admin'
    });


const Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.getUserById = function(id, callback){
  Admin.findById(id, callback);
}

module.exports.getUserByUsername = function(admin_username, callback){
  const query = {admin_username: admin_username}
  Admin.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.addUser = function(newUser, callback){
    newUser.save(callback);
}