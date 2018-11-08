const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../config/database')

const User = require('../models/User');

// Register
router.post('/register', (req, res, next) => {
  console.log(`${req.method} ${req.url} ${req.httpVersion}`);
  // Build user object
  let newUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  // Make sure username not taken
  User.getUserByUsername(newUser.username, (err, user) => {
    if(err) throw err;
    if(!user){
      // If username not taken, add user
      User.addUser(newUser, (err, user) => {
        if(err){
          res.json({success: false, msg:'Failed to register user'});
        } else {
          res.json({success: true, msg:'User registered'});
        }
      });
    } else {
      return res.json({success: false, msg: 'Username taken'});
    }
  }); 
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  console.log(`${req.method} ${req.url} ${req.httpVersion}`);
  const username = req.body.username;
  const password = req.body.password;
  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      return res.json({success: false, msg: 'User not found'});
    }
    // Make sure password matches
    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        //if match, create token
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });
        //Send token in response
        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            username: user.username
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
// router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
//   console.log(`${req.method} ${req.url} ${req.httpVersion}`);
//   res.json({user: req.user});
// });
router.get('/profile', (req, res, next) => {
  console.log(`${req.method} ${req.url} ${req.httpVersion}`);
  console.log("req is ", req.headers);
  
  res.json({user: req.headers});
});

module.exports = router;
