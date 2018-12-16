const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Admin = require('../models/admin');
const Item = require('../models/items');
const Collection = require('../models/collection');

// Register Users
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

        if(user.activate == false){
          res.json({
            success: false, msg: 'Your Account is Deactivated, please contact store manager.'
          });
        }

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

//show cart for user
router.post('/cart', function(req,res){
  var array = []
  for(var i=0; i<req.body.length; i++){
    var id = req.body[i].id
    Item.findById(id, function(err,item){
      console.log(item)
      if(err) res.json(err);
      else 
      { array.push({item})}
    })
  }
    console.log(array)
    res.json({array})
})

//collection
router.post('/collection/:id', function(req,res){
  let id = req.body.id
  Item.findById(req.params.id, function(err,item){
    let newCollection = new Collection({
     item_name : item.item_name,
     item_price : item.item_price,
     user_id : id,
     private : false
    });

    Collection.addItem(newCollection, (err, item) => {
      if(err){
        res.json({success: false, msg:'Failed to add item'});
      } else {
        res.json({success: true, msg:'Item added'});
      }
    });
  })
})

//show collection
router.post('/showcollection', function(req,res){
  let id = req.body.id;
  let array = []
  Collection.find({ "user_id": id }, function(err, collection){
    if(err){
      res.json({success: false, msg: 'Failed'});
    } else {
      array.push(collection)
      res.json({array})
    }
  })
})

//Public/Private Collection
router.put('/changeCollection', function(req,res){
  for(var i=0;i<req.body.length;i++){
    Collection.findById(req.body[i], function(err,coll){
      if (err)
        res.json({success: false, msg:'Failed'});
      else {
        coll.item_name = coll.item_name;
        coll.item_price = coll.item_price;
        if(coll.private == false){
          coll.private = true;
        }else{
          coll.private = false;
        }
        coll.user_id = coll.user_id;

        coll.save().then(coll => {
            res.json('Update complete');
        })
        .catch(err => {
            res.status(400).send("unable to update the database");
        });
      }
    })
  }
})

//Authenticate Admin
router.post('/authenticate/admin', (req, res, next) => {
  const admin_username = req.body.admin_username;
  const admin_password = req.body.admin_password;

  Admin.getUserByUsername(admin_username, (err, admin) => {
    if(err) throw err;
    if(!admin){
      return res.json({success: false, msg: 'User not found'});
    }

    Admin.comparePassword(admin_password, admin.admin_password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
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


//Get Items
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

//Get Users
router.get('/authenticate/viewUsers', function (req, res) {
  User.find(function (err, users){
   if(err){
     console.log(err);
   }
   else {
     res.json({users});
   }
 });
});

//Edit item
router.get('/authenticate/admin/editItem/:id', function(req,res){
  var id = req.params.id;
  Item.findById(id, function(err,item){
    res.json(item);
  })
})

//update item
router.post('/authenticate/admin/updateItem/:id', function(req,res,next){
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

//Delete Item
router.get('/admin/deleteItem/:id', function(req,res){
  Item.findByIdAndRemove({_id: req.params.id}, function(err, item){
    if(err) res.json(err);
    else res.json('Successfully removed');
  });
})

//Add to admin
router.post('/admin/addtoadmin/:id', function (req,res,next) {
  User.findById(req.params.id, function(err, user) {
    if(!user)
    return next(new Error ('Could not load user'));
    else{
      let newUser = new Admin({
        admin_username : user.username,
        admin_password : user.password
      });
    
      Admin.addUser(newUser, (err, admin) => {
        if(err){
          res.json({success: false, msg:'Failed to register user'});
        } else {
          res.json({success: true, msg:'User registered'});
        }
      });
    }
  })
})

//Deactivate user
router.post('/admin/deactivate/:id', function (req,res,next) {
  User.findById(req.params.id, function(err, user) {
    if(!user)
    return next(new Error ('Could not load user'));
    else{
      user.name = user.name;
      user.email = user.email;
      user.username = user.username;
      user.passowd = user.password;
      if(user.activate == true){
        user.activate = false
      }else{
        user.activate = true
      }

      user.save().then(user => {
        res.json('Update complete');
      })
      .catch(err => {
        res.status(400).send("unable to update the database");
      });
    }
  })
})

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});

module.exports = router;
