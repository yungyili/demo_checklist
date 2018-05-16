// auth.js
var passport = require('passport');
var passportJWT = require('passport-jwt');
var cfg = require('././config/keys.js');
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
  secretOrKey: keys.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeader()
};

var users = [
  {
    id: 1,
    name: 'John',
    email: 'john@mail.com',
    password: 'john123'
  },
  {
    id: 2,
    name: 'Sarah',
    email: 'sarah@mail.com',
    password: 'sarah123'
  }
];

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
      return passport.authenticate('jwt', cfg.jwtSession);
    }
  };
};
