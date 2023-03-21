
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    phone: {
        type: Number,
        unique:true,
        required:true
    },
    email: {
        type: String,
        unique: true,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    confirmpassword: {
        type: String,    
        required:true
    },
   

})

//before Register.save() save  the data we need to secure password
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        console.log("The current password is:", this.password);
        this.password = await bcrypt.hash(this.password, 10);
        console.log("the current password is:", this.password);
        
    }
    next();
})

//create collection
const Register = new mongoose.model("Register", userSchema);

module.exports = Register;
