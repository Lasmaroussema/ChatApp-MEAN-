let express = require('express');
let app = express.Router();

let users = require('../db/userModel');


app.get("/user/:name", (req, res, next) => {
    users.find({}).then((users) => {
            res.send(users);
    })
})

app.get("/:user/:pass", (req, res, next) => {
    users.find({ username: req.params.user, password: req.params.pass }).then((user) => {
            res.send(user);
    })
})


app.post("/:user/:pass", (req, res, next) => {

     users.find({ username: req.params.user, password: req.params.pass }).then((user) => {
         if (user.length > 0)
             res.send("user already exists");
         else
         {
              let user = new users( { username: req.params.user, password: req.params.pass });
              user.save().then(() => {
                     res.send("new user created");
                    })
        }
    })

   
})


module.exports = app;



