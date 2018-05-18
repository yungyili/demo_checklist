const jwt = require("jwt-simple");
const keys = require('../config/keys.js');
const users = require('../models/users');

module.exports = (app, auth) => {
  app.get("/api/user", auth.authenticate(), function(req, res) {
      console.log("get /user:", req.user);
      var user = users.find(function(u) {
          return u.id === req.user.id;
      });

      res.json(user);
  });

  app.post("/api/login", function(req, res) {
      console.log("post /login: ", req.body);
      if (req.body.email && req.body.password) {
          var email = req.body.email;
          var password = req.body.password;
          var user = users.find(function(u) {
              return u.email === email && u.password === password;
          });
          if (user) {
              var payload = {
                  id: user.id
              };
              var token = jwt.encode(payload, keys.jwtSecret);
              res.json({
                  token: token
              });
          } else {
              res.sendStatus(401);
          }
      } else {
          res.sendStatus(401);
      }
  });
};
