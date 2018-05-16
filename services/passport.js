// auth.js
var passport = require('passport');
var passportJWT = require('passport-jwt');
var keys = require('../config/keys.js');
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var users = require('../models/users');
var params = {
  secretOrKey: keys.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt")
};

module.exports = function() {
  var strategy = new Strategy(params, function(payload, done) {
    var user = users[payload.id] || null;
    if (user) {
      return done(null, {
        id: user.id
      });
    } else {
      return done(new Error('User not found'), null);
    }
  });
  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate('jwt', keys.jwtSession);
    }
  };
};
