const express = require("express");
const router = new express.Router();
const Register = require("../models/registers");

router.get('/', (req, res) => {
    res.render("index");
})

router.get("/register", (req, res) => {
    res.render("register");
})

router.post("/register", async(req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if (password === cpassword) {
            //if password match then store all the data in register collection
            const registerUser = new Register({
                name: req.body.name,
                phone: req.body.phone,
                email:req.body.email,
                password:req.body.password,
                confirmpassword: req.body.confirmpassword,
                address:req.body.address
            })
            
            const registered = await registerUser.save();
            res.status(201).render("index");
        } else {
            res.send("Password is not matched");
        }
    } catch (err) {
        res.status(400).send(err);
    }
})

//login part
router.get("/login", (req, res) => {
    res.render("login");
})

router.post("/login", async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        //console.log("Email is", email);
      const userEmail= await Register.findOne({ email: email });
        if (userEmail.password === password) {
            res.status(201).render("index");
        } else {
            res.send("Password not matched");
       }
    } catch (err) {
        res.status(400).send("Invalid email");
    }
})

module.exports = router;