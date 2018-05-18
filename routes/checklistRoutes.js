const jwt = require("jwt-simple");
const keys = require('../config/keys.js');
const users = require('../models/users');
const checklists = require('../models/checklists');

module.exports = (app, auth) => {
  app.get("/api/checklist", auth.authenticate(), function(req, res) {
    console.log("get /api/checklist:", req.user);
    var user = users.find(function(u) {
        return u.id === req.user.id;
    });
    console.log("get /api/checklist:", checklists);
    res.send(checklists);
  });
  app.post("/api/checklist", auth.authenticate(), function(req, res) {
    console.log("post /api/checklist:", req.user);
    var user = users.find(function(u) {
        return u.id === req.user.id;
    });
    res.send({});
  });

};
