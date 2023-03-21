const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;
require("./db/conn");
const hbs = require("hbs");

const Register = require("./models/registers");

/* const static_path = path.join(__dirname, "../public/");
app.use(express.static(static_path)); */

const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render("index");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.post("/register", async(req, res) => {
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
app.get("/login", (req, res) => {
    res.render("login");
})

app.post("/login", async (req, res) => {
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







//app running on port
app.listen(port, () => {
    console.log('App is running on port', port);
})