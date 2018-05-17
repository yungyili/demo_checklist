const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const auth = require('./services/passport')();
const users = require('./models/users');
const jwt = require("jwt-simple");
const keys = require('./config/keys.js');

app.use(bodyParser.json());
app.use(auth.initialize());

app.get('/api', (req,res)=>{
  res.send({
    status: 'Service is alive!'
  });
});

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

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log("Listening on port", PORT));
