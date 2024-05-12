const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const methodOverride = require('method-override');
const mDB = require('./server/database/connection');

const app = express();

dotenv.config();

const PORT = process.env.PORT || 8080
console.log(PORT);

// log requests
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// mongodb connection
mDB();

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended : true}))


app.use('/styles', express.static(path.resolve(__dirname, "views/styles")))

// set view engine
app.set("view engine", "ejs")
//app.set("views", path.resolve(__dirname, "views/ejs"))

// load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

app.use(express.static("assets/js"));

// load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});





