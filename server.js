const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const methodOverride = require('method-override');
const mDB = require('./server/database/connection');
const session = require('express-session');



const app = express();

dotenv.config();

const PORT = process.env.PORT || 8080;
console.log(PORT);

// log requests
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// mongodb connection
mDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/styles', express.static(path.resolve(__dirname, "views/styles")));

 

// set view engine
app.set("view engine", "ejs");

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

app.use(express.static("assets/js"));

// Middleware for password authentication
var theAdmin= false;
 
 
// Middleware to check if user is admin
function isAdmin(req, res, next) {
    if (theAdmin) {
        next();
    } else {
        // res.status(403).send("You are not authorized to access this route.");
        
        res.redirect('/login')
    }
}

// Routes
const router = require('./server/routes/router');

// Login route
app.get('/login', (req, res) => {
    res.render('user-login');
});

// Authentication route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Check if credentials are correct
    console.log("\n\n\n|||||||||||||||", username,password, '|||||||||||||||\n\n\n');
    if (password === '123') {
        theAdmin = true;
        res.redirect('/');
    } else {
        res.status(401).send("Invalid credentials");
    }
});
 
// app.use('/', require('./server/routes/router'));
app.use('/', isAdmin, require('./server/routes/router'));
// Non-admin routes

 

app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });