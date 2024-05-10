let mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/test").then(() => {
    console.log("connected to data base")
});

module.exports = mongoose;