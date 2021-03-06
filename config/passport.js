const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const config = require('../config/database');


module.exports = function(passport) {
  let opts = {};
  //Look for JWT in authorization header
  opts.jwtFromRequest = 
  ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = config.secret;
  //jwt_payload contains decoded JWT payload
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.getUserById(jwt_payload._id, (err, user) => {
      if(err) {
        return done(err, false);
      }
      if(user) {
        //set null for error
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }))
}