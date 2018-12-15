const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Admin = require('../models/admin');
const Item = require('../models/items');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate User
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

//Authenticate Admin
router.post('/authenticate/admin', (req, res, next) => {
  const admin_username = req.body.admin_username;
  const admin_password = req.body.admin_password;
  // console.log("abcd")

  Admin.getUserByUsername(admin_username, (err, admin) => {
    if(err) throw err;
    // console.log(admin_username,admin,req.body.admin_username)
    if(!admin){
      return res.json({success: false, msg: 'User not found'});
    }

    Admin.comparePassword(admin_password, admin.admin_password, (err, isMatch) => {
      if(err) throw err;
      if(admin_password==admin.admin_password){
        const token = jwt.sign(admin.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          admin: {
            id: admin._id,
            admin_username: admin.admin_username,
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Add Item
router.post('/authenticate/addItem', (req, res, next) => {
  let item = new Item({
    item_name: req.body.item_name,
    item_quantity: req.body.item_quantity,
    item_price: req.body.item_price,
    item_tax: req.body.item_tax
  });

  Item.addItem(item, (err, item) => {
    if(err){
      res.json({success: false, msg:'Failed to add item'});
    } else {
      res.json({success: true, msg:'Item added'});
    }
  });
});


//get Items
router.get('/authenticate/viewItem', function (req, res) {
  Item.find(function (err, items){
   if(err){
     console.log(err);
   }
   else {
     res.json({items});
   }
 });
});

//get Users
router.get('/authenticate/viewUsers', function (req, res) {
  User.find(function (err, users){
   if(err){
     console.log(err);
   }
   else {
    //  console.log(users)
     res.json({users});
   }
 });
});

//deactivate user
router.post('/admin/deactivate/:id', function (req,res,next) {
  User.findById(req.params.id, function(err, user) {
    if(!user)
    return next(new Error ('Could not load user'));
    else{
      user.name = user.name;
      user.email = user.email;
      user.username = user.username;
      user.passowd = user.password;
      user.activate = false

      user.save().then(user => {
        res.json('Update complete');
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      });
    }
  })
})


//edit item
router.get('/authenticate/admin/editItem/:id', function(req,res){
  var id = req.params.id;
  Item.findById(id, function(err,item){
    res.json(item);
  })
})

//update item
router.post('/authenticate/admin/updateItem/:id', function(req,res,next){
  // console.log(req.params.id, "id")
  Item.findById(req.params.id, function(err, item) {
    if (!item)
      return next(new Error('Could not load Document'));
    else {
      item.item_name = req.body.item_name;
      item.item_price = req.body.item_price;
      item.item_quantity = req.body.item_quantity;
      item.item_tax = req.body.item_tax;

      item.save().then(item => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
})

//delete Item
router.get('/authenticate/admin/deleteItem/:id', function(req,res){
  Item.findByIdAndRemove({_id: req.params.id}, function(err, item){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
})


// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
