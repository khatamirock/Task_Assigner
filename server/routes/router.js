const express = require('express');
const route = express.Router()
const axios = require('axios');

const services = require('../services/render');
const controller = require('../controller/controller');
const { Userdb } = require('../model/model');
const {isAdmin,isLogged } = require('../../auth');

 

route.get('/',isAdmin,services.homeRoutes);
 


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




// for user
route.get('/user-home', isLogged,(req,res)=>{
    res.render('user-home',{username:req.query.user});

});
route.get('/tasks',isLogged,(req,res)=>{
    res.send("complete them.........");
});


// find-userForLogin with Pass
route.post('/api/login_handler',controller.login_sys);
route.get('/logout',controller.logout);
route.get('/login', (req, res) => {
    res.render('user-login');
});



















module.exports = route