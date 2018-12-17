const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var Token = require('./token');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  activate: {
    type: Boolean,
    default: true
  }
},{
  collection: 'users'
});

//users
const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function(id, callback){
  User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
  const query = {username: username}
  User.findOne(query, callback);
}

module.exports.addUser = function(newUser, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if(err) throw err;
      newUser.password = hash;
      newUser.save(callback);
    });
  });
  var token = new Token({ _userId: newUser._id, token: crypto.randomBytes(16).toString('hex') });
          // Save the verification token
          token.save(function (err) {
              if (err) { return res.status(500).send({ msg: err.message }); }
  
              // Send the email
              var transporter = nodemailer.createTransport({ host:'smtp.gmail.com', port: '465', auth: { user: 'mpatel260197@gmail.com', pass: 'no body can open it26' } });
              var mailOptions = { from: 'no-reply@yourwebapplication.com', to: newUser.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/\/confirmation\/' + token.token + '.\n' };
              transporter.sendMail(mailOptions, function (err, info) { console.log(err, transporter) });
            });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}

module.exports.getUsers = function(user, res){
  User.find(function (err, users){
    if(err){
      console.log(err);
    }
    else {
      res.json(users);
    }
  });
}

