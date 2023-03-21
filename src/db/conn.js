const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/Registration", {
    useNewUrlParser: true
}).then(() => {
    console.log("connection with db is successfull");
}).catch((err) => {
    console.log("connection error is", err);
})