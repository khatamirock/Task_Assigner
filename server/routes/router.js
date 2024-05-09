const express = require('express');
const route = express.Router()

 
const services = require('../services/render');
const controller = require('../controller/controller');




/**
 *  @description Root Routee
 *  @method GET /
 */
route.get('/', services.homeRoutes);


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






route.get('/kirevai',(req,res)=>{
    var id=req.query.id;
    // var id=12;
    console.log(id);
    res.render('add_post');
    
})


 

// API
route.post('/api/users', controller.create);
route.post('/api/new_post', controller.post_create);
route.get('/api/users/', controller.find);
// if we wnated to directly pass the id as param api/users/id/1233.... 
// route.get('/api/users/:id', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


module.exports = route