const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Admin = require('../models/admin');

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