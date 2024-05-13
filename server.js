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
var { theAdmin, isAdmin } = require('./auth');

// Login route
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));

 


app.use('/', require('./server/routes/router'));

// // Non-admin routes



app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`) });