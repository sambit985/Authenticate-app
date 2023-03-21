const express = require('express');
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;
require("./db/conn");
const hbs = require("hbs");

const Register = require("./models/registers");
const router = require("./routes/regist");

/* const static_path = path.join(__dirname, "../public/");
app.use(express.static(static_path)); */

const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.use(express.json());
app.use(router);
app.use(express.urlencoded({ extended: false }));


//app running on port
app.listen(port, () => {
    console.log('App is running on port', port);
})