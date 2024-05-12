const express = require('express');
const route = express.Router()
const axios = require('axios');

 

route.get('/',(req,res)=>{
    res.send("HELLO users>>>>>>>>>>>>");
});


