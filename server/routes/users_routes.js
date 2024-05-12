const express = require('express');
const route = express.Router()
const axios = require('axios');

 

route.get('/',(req,res)=>{
    res.send("HELLO users>>>>>>>>>>>>");
});


route.get('/tasks',(req,res)=>{
    res.send("complete them.........");
});


module.exports = route;