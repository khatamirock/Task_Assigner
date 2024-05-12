const express = require('express');
const route = express.Router()
const axios = require('axios');

const services = require('../services/render');
const controller = require('../controller/controller');
const { Userdb } = require('../model/model');
const session = require('express-session');



/**
 *  @description Root Routee
 *  @method GET /
 * 
 */



route.get('/', services.homeRoutes);
route.get('/logn',(req,res)=>{
    res.render('user-login');

});

// route.get('/userl','user-login');



/**
 *  @description add users
 *  @method GET /add-user
 */





route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)
route.get('/delete_user',services.delete_user)






route.get('/kirevai', services.add_post)
route.get('/post_of_user', services.find_post);




// API
route.post('/api/users', controller.create);
route.post('/api/new_post', controller.post_create);
route.get('/api/users/', controller.find);
// if we wnated to directly pass the id as param api/users/id/1233.... 
// route.get('/api/users/:id', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


// for posts.>>>>>>>>>>>

route.get('/api/post/:id', controller.find_post);
route.get('/api/post_done', controller.post_done);






module.exports = route