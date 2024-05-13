

var {Userdb, Postdb} = require('../model/model');

// create and save new user

 

exports.create = (req,res)=>{
    console.log("KIRE vaii in controller.create");
    
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    
    // new user
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password,
        gender: req.body.gender,
        status : req.body.status
    })
    
    
    // save user in the database
    user
        .save(user)
        .then(data => {
            res.redirect('/');
            console.log('DONE from userBD create,.');
            // res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}


exports.post_create=(req,res)=>{

    
    
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    
    var post=new Postdb({
        title:req.body.title,
        content:req.body.content,
        user:req.body.user  
        
        
    });

    post.save()
    .then((data) => {
        // If the post is successfully saved, redirect to the homepage
        res.redirect('/');
    })
    .catch(e => {
        // If there's an error saving the post, send an error response
        console.error('Error saving post:', e);
        res.status(500).send({
            message: "Some error occurred while creating a create operation"
        });
    });


    
}




// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{
    // console.log('123123123123\n\n\n\n\n');
    
    // console.log(req.params,'finding params....');
    
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }

    
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    // res.send({id,...req.body});
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                // res.send(data)
                res.redirect('/');
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    console.log("\n\n\n\n\n\n\n deleting wait.........");
    
    const id = req.params.id;

    // Delete the user and associated posts using deleteOne
    Userdb.deleteOne({ _id: id })
        .then(async (data) => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            } else {
                // Optionally, you can also handle the deletion of posts here
                // await Postdb.deleteMany({ user: id });

                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}



exports.find_post=(req,res)=>{
    const id=req.params.id;
    console.log(id);
    
    if(id){
        // // // //finding the post by user id................
        Postdb.find({user:id})
        .then(data=>{
            res.send(data);
        })
        .catch(err=>{
            res.send(err)
        })
        // console.log('finding post...........');
        // res.send(`finder....${id}`);

        

    }
    else{
        res.send("No post found");
    }    


}

exports.post_complete=((req,res)=>{
    const id=req.query.id;
    console.log("\n\n\n|||||||||||||||", id[0], '|||||||||||||||\n\n\n');
    if(id){
        Postdb.deleteOne({_id:id[0]})
        .then(data=>{
            console.log(data);
            res.redirect('/');
        })
        .catch(err=>{
            console.log(err);
        })
    }
    // res.send(["\n\n\n|||||||||||||||", 'post sone............',id, '|||||||||||||||\n\n\n']);
    

});





