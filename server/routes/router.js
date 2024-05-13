const express = require('express');
const route = express.Router()
const axios = require('axios');

const services = require('../services/render');
const controller = require('../controller/controller');
const { Userdb } = require('../model/model');
const {isAdmin,isLogged } = require('../../auth');

 

route.get('/',isAdmin,services.homeRoutes);
 


route.get('/add-user',isAdmin, services.add_user)

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


// // // // //finding the post by user id................
route.get('/api/post/:id', controller.find_post);
route.get('/api/post_done', controller.post_complete);





// for user
route.get('/user-home', isLogged,(req,res)=>{

    const id=req.query.id;
    axios.get(`http://localhost:5000/api/post/${id}`)
    .then(function(response) {
        console.log('Request successful:');
        console.log("\n\n\n|||||||||||||||", response.data, '|||||||||||||||\n\n\n');
        res.render('user-home',{username:req.query.user,posts:response.data});
    })
    .catch(err => {
        console.error('Error making GET request:', err);
        res.status(500).send('Internal Server Error');
    })

});


// find-userForLogin with Pass
route.post('/api/login_handler',services.login_sys);
route.get('/logout',services.logout);
route.get('/login', (req, res) => {
    res.render('user-login');
});

route.get('/signup', services.signup_Syst);
route.get('/tasks',isLogged,(req,res)=>{
    res.send("complete them.........");
});

















module.exports = route